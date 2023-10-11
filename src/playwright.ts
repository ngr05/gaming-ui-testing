import { test as base } from '@playwright/test';

import { getProductContainer, getPromotionsPage } from './utils/factory';
import Homepage from './page/home.page';
import Setup from './utils/setup';
import { Customer, getAccount, releaseAccount } from './utils/customer';
import Promotions from './page/promotions.page';
import { newPromotionsListPage } from './config/cookies';
import ProductContainer from './components/productContainer.component';

export { expect } from '@playwright/test';

interface CustomFixtures {
    container: ProductContainer;
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
            const account = await getAccount();
            console.debug(`[worker: ${info.workerIndex}] user ${account.username} sourced, testing...`);
            await use(account);
            await releaseAccount(account);
            console.debug(
                `[worker: ${info.workerIndex}] completed testing for the worker and user account released (${account.username})`,
            );
        },
        { scope: 'worker' },
    ],

    container: async ({ page }, use) => {
        const container: ProductContainer = getProductContainer(page);
        await use(container);
    },

    setup: async ({ page }, use) => {
        const setup = new Setup(page);
        await use(setup);
    },

    homepage: async ({ page }, use) => {
        const homepage: Homepage = new Homepage(page);
        await homepage.goTo();
        await use(homepage);
    },

    promoPage: async ({ page, setup }, use) => {
        const promoPage: Promotions = getPromotionsPage(page);
        await promoPage.goTo();
        await setup.setDefaultCookies();
        await promoPage.addCookie(newPromotionsListPage);
        await use(promoPage);
    },
});
