#!/usr/bin/env npx ts-node

// This is very much work in progress and just a theory

import { Command } from 'commander';
import { exec } from 'child_process';

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

interface RunOptions {
    ui: boolean;
}

const program = new Command();

program.name('test-gpt').description('Testing Gaming portals with playwright').version('0.0.1');

program
    .command('run')
    .description('Runs the tests')
    .argument('<environment>', 'the environment to test')
    .argument('<product>', 'the product to test')
    .option('--ui', 'run the tests using the playwirght UI')
    .action((environment: Environments, product: Products, options: RunOptions) => {
        let command = `ENVIRONMENT=${environment} PRODUCT=${product} npm run test`;
        if (options.ui) {
            command = `${command}:ui`;
        }
        console.log(
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            }),
        );
    });

program.parse();
program.showHelpAfterError('(add --help for additional information)');
