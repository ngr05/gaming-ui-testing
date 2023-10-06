import { test as base } from '@playwright/test';

import Setup from './utils/setup';

import Homepage from './page/home.page';
import BingoHomepage from './page/bingo/home.page';
import CasinoHomepage from './page/casino/home.page';
import VegasHomepage from './page/vegas/home.page';
import { Customer, getAccount, releaseAccount } from './utils/customer';

export { expect } from '@playwright/test';

interface CustomFixtures {
    setup: Setup;
    homepage: Homepage;
}

interface CustomWorkerFixtures {
    account: Customer;
}

export const test = base.extend<CustomFixtures, CustomWorkerFixtures>({
    account: [
        async ({}, use, info) => {
            console.debug(`[worker: ${info.workerIndex}] getting user for worker`);
            const account = await getAccount();
            console.debug(`[worker: ${info.workerIndex}] user ${account.username} sourced, testing...`);
            await use(account);
            console.debug(`[worker: ${info.workerIndex}] completed testing for the worker`);
            await releaseAccount(account);
            console.debug(`[worker: ${info.workerIndex}] user account released (${account.username})`);
        },
        { scope: 'worker' },
    ],

    setup: async ({ page }, use) => {
        const setup = new Setup(page);
        await use(setup);
    },

    homepage: async ({ page }, use) => {
        let homepage: Homepage;
        switch (process.env.PRODUCT) {
            case 'bingo':
                homepage = new BingoHomepage(page);
                break;
            case 'casino':
                homepage = new CasinoHomepage(page);
                break;
            case 'vegas':
                homepage = new VegasHomepage(page);
                break;
            default:
                throw new Error('cannot work out the right home page instance!');
        }

        await homepage.open();
        await use(homepage);
    },
});
