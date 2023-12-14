import report from './report';
import { runCmd } from './utils';

export enum Environments {
    LIVE = 'live',
    STAGING = 'staging',
    TEST = 'test',
}
export enum Products {
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

    // validate inputs
    if (!Object.values(Environments).includes(options.environment)) {
        throw new Error(
            `Please select a valid environment from ${Object.values(Environments).join(
                ', ',
            )}! Casino next environment is "test".`,
        );
    }
    if (!Object.values(Products).includes(options.product)) {
        throw new Error(`Please select a valid product from ${Object.values(Products).join(', ')}`);
    }

    // let command = `PLAYWRIGHT_JUNIT_SUITE_NAME="Gaming UI Tests" ENVIRONMENT=${options.environment} PRODUCT=${options.product} npm run test`;
    let command = `npm run test`;
    if (options.ui) {
        command = `${command}:ui`;
    }
    if (options.tag) {
        command = `${command} --grep @${options.tag.map((tag: string) => `${tag}`).join('|@')}`;
    }
    runCmd(command, {
        env: {
            ENVIRONMENT:
                options.environment === Environments.TEST
                    ? options.product === Products.CASINO
                        ? 'next'
                        : 'test2'
                    : options.environment,
            PRODUCT: options.product,
            PLAYWRIGHT_JUNIT_SUITE_NAME: 'Gaming UI Tests',
        },
    });

    if (options.testrail && !options.ui) {
        await report({ ...options });
    }
};
