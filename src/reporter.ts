/**
 * This is very much an adaptation of the junit Playwright reporter in order to enable the reporting of tests into
 * TestRail.
 * Origional: https://github.com/microsoft/playwright/blob/main/packages/playwright/src/reporters/junit.ts
 */

import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import { access, mkdir, writeFile } from 'fs/promises';
import { basename, dirname, relative, resolve } from 'path';
import { cwd } from 'process';

enum Outcome {
    FAILED = 'failed',
    INTERRUPTED = 'interrupted',
    PASSED = 'passed',
    SKIPPED = 'skipped',
    TIMEDOUT = 'timedout',
}

interface XMLObject {
    attributes?: Record<string, boolean | number | string>;
    children?: XMLObject[];
    tag: string;
    text?: string;
}

class CustomReporter implements Reporter {
    private config: FullConfig;
    private outputFile: string;
    private startTime: Date;
    private suite: Suite;
    private template = '{suite}';
    private totalTests = 0;
    private totalFailures = 0;
    private totalSkipped = 0;
    private resolvedOutputFile?: string;

    constructor(options: { outputFile?: string } = {}) {
        this.outputFile = options.outputFile || this.reportOutputNameFromEnv();
    }

    onConfigure(config: FullConfig) {
        this.config = config;
    }

    onBegin(config: FullConfig, suite: Suite) {
        console.log('======================================================');
        console.log(`Starting the run with ${suite.allTests().length} tests`);
        console.log('------------------------------------------------------');

        this.config = config;
        this.resolvedOutputFile = config.configFile
            ? resolve(dirname(config.configFile), this.outputFile)
            : this.outputFile;
        this.suite = suite;
        this.startTime = new Date();

        if (!/\{suite\}/.exec(this.resolvedOutputFile)) {
            throw new Error(
                `Please include '${this.template}' in the file name so that each browser can be reported into TestRail`,
            );
        }
    }

    onTestBegin(test: TestCase): void {
        console.log(`Starting test ${test.title}`);
        // console.log(`[debug] [onTestBegin] ${JSON.stringify(test.annotations)}`);
    }

    // onStdOut(chunk: string | Buffer, test?: TestCase, result?: TestResult) {
    // }

    // onStdErr(chunk: string | Buffer, test?: TestCase, result?: TestResult) {
    // }

    onTestEnd(test: TestCase, result: TestResult): void {
        console.log(
            `Finished test ${test.title}: ${result.status} (${result.duration / 1000}s) [attachments: ${
                result.attachments.length
            }]`,
        );
    }

    async onEnd(
        result: FullResult,
    ): Promise<void | { status?: 'passed' | 'failed' | 'timedout' | 'interrupted' | undefined } | undefined> {
        const duration = new Date().getTime() - this.startTime.getTime();
        console.log('------------------------------------------------------');
        console.log(`Finished the run: ${result.status} (${duration / 1000}s)`);
        console.log('======================================================');

        const children: XMLObject[] = [];

        for (const project of this.suite.suites) {
            for (const file of project.suites) {
                children.push(await this.suiteToXml(project.title, file));
            }
        }

        const output: XMLObject = {
            attributes: {
                errors: 0,
                failures: this.totalFailures,
                id: process.env[`PLAYWRIGHT_JUNIT_SUITE_ID`] || '',
                name: process.env[`PLAYWRIGHT_JUNIT_SUITE_NAME`] || '',
                skipped: this.totalSkipped,
                tests: this.totalTests,
                time: duration / 1000,
            },
            tag: 'testsuites',
        };

        if (!this.resolvedOutputFile) {
            output.children = children;
            const report = this.serialize(output).join('\n');
            console.log(report);
            return;
        }

        const browsers: Record<string, XMLObject[]> = {};

        for (const child of children) {
            if (!child.attributes || !child.attributes.hostname) {
                throw new Error('could not determine the browser');
            }
            const browser = child.attributes.hostname.toString();
            if (!browsers[browser]) {
                browsers[browser] = [];
            }
            browsers[browser].push(child);
            // output.children = [child];
            // const report = this.serialize(output).join('\n');
            // await mkdir(dirname(this.resolvedOutputFile), { recursive: true });
            // await writeFile(this.resolvedOutputFile.replace(this.template, name.toString()), report);
        }

        for (const browser of Object.keys(browsers)) {
            output.children = browsers[browser];
            const report = this.serialize(output).join('\n');
            await mkdir(dirname(this.resolvedOutputFile), { recursive: true });
            await writeFile(this.resolvedOutputFile.replace(this.template, browser), report);
        }

        // output.children = children;
        // const report = this.serialize(output).join('\n');
        // const filename = this.resolvedOutputFile.replace(this.template, '').replaceAll(/(\.+)/g, '.');
        // await mkdir(dirname(filename), { recursive: true });
        // await writeFile(filename, report);
    }

    // async onExit() {
    // }

    // onError(error: TestError) {
    // }

    // onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
    // }

    // onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
    // }

    printsToStdio(): boolean {
        return !this.outputFile;
    }

    // version(): 'v1' {
    //     return 'v1';
    // }

    private reportOutputNameFromEnv(): string {
        if (process.env[`PLAYWRIGHT_JUNIT_OUTPUT_NAME`]) {
            return resolve(process.cwd(), process.env[`PLAYWRIGHT_JUNIT_OUTPUT_NAME`]);
        }
        return resolve(process.cwd(), 'test-results/custom-junit-report.xml');
    }

    private serialize(xml: XMLObject): string[] {
        const attributes: string[] = [];
        const lines: string[] = [];

        for (const [key, value] of Object.entries(xml.attributes || {})) {
            attributes.push(`${key}="${this.escape(String(value), false)}"`);
        }

        lines.push(`<${xml.tag}${attributes.length !== 0 ? ` ${attributes.join(' ')}` : ''}>`);

        for (const child of xml.children || []) {
            lines.push(...this.serialize(child));
        }

        if (xml.text) {
            lines.push(this.escape(xml.text, true));
        }

        lines.push(`</${xml.tag}>`);
        return lines;
    }

    private async suiteToXml(project: string, suite: Suite): Promise<XMLObject> {
        const children: XMLObject[] = [];
        const counts = {
            failures: 0,
            skipped: 0,
            tests: 0,
        };
        let duration = 0;

        for (const test of suite.allTests()) {
            counts.tests++;

            if (test.outcome() === Outcome.SKIPPED) {
                counts.skipped++;
            }

            if (!test.ok()) {
                counts.failures++;
            }

            for (const result of test.results) {
                duration += result.duration;
            }

            children.push(...(await this.casesToXML(suite.title, test)));
        }

        this.totalFailures += counts.failures;
        this.totalSkipped += counts.skipped;
        this.totalTests += counts.tests;

        return {
            attributes: {
                errors: 0,
                failures: counts.failures,
                hostname: project,
                name: suite.title,
                // name: `${project} - ${suite.title}`,
                skipped: counts.skipped,
                tests: counts.tests,
                time: duration / 1000,
                timestamp: this.startTime.toISOString(),
            },
            children,
            tag: 'testsuite',
        };
    }

    private async casesToXML(title: string, test: TestCase): Promise<XMLObject[]> {
        const cases: XMLObject[] = [];

        const tc: XMLObject = {
            attributes: {
                name: test.titlePath().slice(3).join(' - '),
                classname: title,
                time: test.results.reduce((prev, current) => prev + current.duration, 0) / 1000,
            },
            children: [],
            tag: 'testcase',
        };
        cases.push(tc);

        const properties: XMLObject = {
            children: [],
            tag: 'properties',
        };

        for (const annotation of test.annotations) {
            properties.children?.push({
                attributes: {
                    name: annotation.type,
                    value: annotation.description || '',
                },
                tag: 'property',
            });
        }

        if (properties.children && properties.children.length > 0) {
            tc.children?.push(properties);
        }

        if (test.outcome() === Outcome.SKIPPED) {
            tc.children?.push({ tag: 'skipped' });
            return cases;
        }

        if (!test.ok()) {
            tc.children?.push({
                attributes: {
                    message: `${basename(test.location.file)}:${test.location.line}:${test.location.column} ${
                        test.title
                    }`,
                    type: 'FAILURE',
                },
                tag: 'failure',
                text: this.formatFailure(test, tc),
            });
        }

        const sysOut: string[] = [];
        const sysErr: string[] = [];

        for (const result of test.results) {
            sysOut.push(...result.stdout.map((item) => item.toString()));
            sysErr.push(...result.stderr.map((item) => item.toString()));

            for (const attachment of result.attachments) {
                if (!attachment.path) {
                    continue;
                }

                let path = relative(this.config.rootDir, attachment.path);
                try {
                    if (this.resolvedOutputFile) {
                        path = relative(dirname(this.resolvedOutputFile), attachment.path);
                    }
                } catch {
                    sysOut.push(
                        `\nWarning: Unable to make attachment path ${attachment.path} relative to report output file ${this.outputFile}`,
                    );
                }

                try {
                    await access(attachment.path);
                    sysOut.push(`\n[[ATTACHMENT|${path}]]\n`);
                } catch {
                    sysErr.push(`\nWarning: attachment ${path} is missing`);
                }
            }
        }

        if (sysOut.length > 0) {
            tc.children?.push({ tag: 'system-out', text: sysOut.join('') });
        }
        if (sysErr.length > 0) {
            tc.children?.push({ tag: 'system-err', text: sysErr.join('') });
        }

        return cases;
    }

    private formatFailure(test: TestCase): string {
        const lines: string[] = [];
        for (const result of test.results) {
            if (result.retry) {
                lines.push('');
                lines.push(`    Retry #${result.retry}`);
            }
            lines.push((result.error?.message || '').replaceAll(/(?:\\x1B)?\[\d+m/g, ''));
            lines.push('');
            lines.push((result.error?.snippet || '').split('\n').join('\n    '));
            lines.push('');
            lines.push(
                `at ${result.error?.location?.file}:${result.error?.location?.line}:${result.error?.location?.column}`,
            );
            for (const attachment of result.attachments || []) {
                const i = result.attachments.findIndex((value) => attachment.path === value.path);
                lines.push('');
                lines.push(
                    `attachment #${i + 1}: ${result.attachments[i].name} (${
                        result.attachments[i].contentType
                    }) `.padEnd(60, '─'),
                );
                lines.push((result.attachments[i]?.path || '').replace(cwd(), ''));
                lines.push(''.padEnd(60, '─'));
            }
        }
        return lines.join('\n    ');
    }

    private escape(text: string, characterData = false): string {
        if (characterData) {
            text = `<![CDATA[${text.replace(/]]>/g, ']]&gt;')}]]>`;
        } else {
            text = text.replace(
                /[&"'<>]/g,
                (c) =>
                    ({
                        '&': '&amp;',
                        '"': '&quot;',
                        "'": '&apos;',
                        '<': '&lt;',
                        '>': '&gt;',
                    })[c]!,
            );
        }
        const discouragedXMLCharacters = /[\u0000-\u0008\u000b-\u000c\u000e-\u001f\u007f-\u0084\u0086-\u009f]/g;
        text = text.replace(discouragedXMLCharacters, '');
        return text;
    }
}

export default CustomReporter;
