import report from './report';
import { runCmd } from './utils';

enum Environments {
    LIVE = 'live',
    NEXT = 'next',
    STAGING = 'staging',
    TEST = 'test2',
}
enum Products {
    BINGO = 'bingo',
    CASINO = 'casino',
    VEGAS = 'vegas',
}

export interface TestOptions {
    environment: Environments;
    key?: string;
    product: Products;
    ui?: boolean;
    tag?: string[];
    title?: string;
    testrail?: boolean;
    username?: string;
}

export default async (options: TestOptions) => {
    if (!options.environment || !options.product) {
        throw new Error(
            'To run the tests please ensure you provide the product and the environment. For more info run $ gput run --help',
        );
    }

    // let command = `PLAYWRIGHT_JUNIT_SUITE_NAME="Gaming UI Tests" ENVIRONMENT=${options.environment} PRODUCT=${options.product} npm run test`;
    let command = `npm run test`;
    if (options.ui) {
        command = `${command}:ui`;
    }
    if (options.tag) {
        command = `${command} ${options.tag.map((tag: string) => `--grep ${tag}`).join(' ')}`;
    }
    runCmd(command, {
        env: {
            ENVIRONMENT: options.environment,
            PRODUCT: options.product,
            PLAYWRIGHT_JUNIT_SUITE_NAME: 'Gaming UI Tests',
        },
    });

    if (options.testrail && !options.ui) {
        await report({ ...options });
    }
};
