#!/usr/bin/env npx ts-node

// This is very much work in progress and just a theory

// GPUT : Gaming Playwright UI Tests

import { Command, Option } from 'commander';
import test, { TestOptions } from './src/commands/test';
import report, { ReportOptions } from './src/commands/report';

const program = new Command();

program.name('gam-gpt').description('Testing Gaming portals with playwright').version('0.0.1');

program
    .command('test')
    .description('Runs the tests')
    .addOption(
        new Option('-e, --environment <environment>', 'the environment to test')
            .choices(['live', 'next', 'staging', 'test2'])
            .makeOptionMandatory(),
    )
    .addOption(
        new Option('-p, --product <product>', 'the product to test')
            .choices(['bingo', 'casino', 'vegas'])
            .makeOptionMandatory(),
    )
    .addOption(new Option('-t, --title <title>', 'the title of the test run'))
    .addOption(new Option('-tr, --testrail', 'whether to report the test run in TestRail'))
    .addOption(new Option('--ui', 'run the tests using the playwirght UI'))
    .action(async (options: TestOptions) => await test(options));

program
    .command('report')
    .description('report the test run')
    .addOption(new Option('-k, --key <key>', "the user's api key"))
    .addOption(new Option('-t, --title <title>', 'the title of the test run'))
    .addOption(new Option('-tr, --testrail', 'whether to add the report into testrail'))
    .addOption(new Option('-u, --username <username>', "the user's username"))
    .action(async (options: ReportOptions) => await report(options));

program.parse();
program.showHelpAfterError('(add --help for additional information)');
