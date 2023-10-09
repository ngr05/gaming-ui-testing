import { test as base } from '@playwright/test';

import { getHomepage, getPromotionsPage } from './page/factory';
import Homepage from './page/home.page';
import Setup from './utils/setup';
import { Customer, getAccount, releaseAccount } from './utils/customer';
import Promotions from './page/promotions.page';
import { newPromotionsListPage } from './config/cookies';

export { expect } from '@playwright/test';

interface CustomFixtures {
    setup: Setup;
    homepage: Homepage;
    promoPage: Promotions;
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
        const homepage: Homepage = getHomepage(page);
        await homepage.open();
        await use(homepage);
    },

    promoPage: async ({ page, setup }, use) => {
        const promoPage: Promotions = getPromotionsPage(page);
        await promoPage.open();
        await setup.setDefaultCookies();
        await promoPage.addCookie(newPromotionsListPage);
        await use(promoPage);
    },
});
