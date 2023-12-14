#!/usr/bin/env -S npx ts-node

// This is very much work in progress and just a theory

// GPUT : Gaming Playwright UI Tests

import { Command, Option } from 'commander';
import test, { Environments, Products, TestOptions } from './src/commands/test';
import report, { ReportOptions } from './src/commands/report';
import development, { DevelopmentOptions } from './src/commands/development';
import { getPackageVersion } from './src/commands/utils';

const program = new Command();

program.name('gam-gpt').description('Testing Gaming portals with playwright').version(getPackageVersion());

program
    .command('development')
    .description('starts the local development environment')
    .addOption(new Option('-f, --fresh', 'whether to clear the data volumes and start clean'))
    .action((options: DevelopmentOptions) => development(options));

program
    .command('test')
    .description('Runs the tests')
    .addOption(
        new Option('-e, --environment <environment>', 'the environment to test')
            .choices(Object.values(Environments))
            .makeOptionMandatory(),
    )
    .addOption(new Option('-k, --key <key>', "the user's api key"))
    .addOption(
        new Option('-p, --product <product>', 'the product to test')
            .choices(Object.values(Products))
            .makeOptionMandatory(),
    )
    .addOption(new Option('--title <title>', 'the title of the test run'))
    .addOption(new Option('-tr, --testrail', 'whether to report the test run in TestRail'))
    .addOption(new Option('--ui', 'run the tests using the playwirght UI'))
    .addOption(new Option('-u, --username <username>', "the user's username"))
    .addOption(new Option('-t, --tag <tag...>', 'any specific tags to run tests for'))
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
