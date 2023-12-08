import { test as base } from '@playwright/test';

import { getGameInfoPage, getHomePage, getProductContainer, getPromotionsPage } from './utils/factory';
import GameInfo from './page/gameInfo.page';
import Homepage from './page/home.page';
import Setup from './utils/setup';
import { Customer, getAccount, releaseAccount } from './utils/customer';
import Promotions from './page/promotions.page';
import { newPromotionsListPage } from './config/cookies';
import ProductContainer from './components/productContainer.component';
import { cwd } from 'process';

export { expect } from '@playwright/test';

interface CustomFixtures {
    container: ProductContainer;
    setup: Setup;
    gameInfo: GameInfo;
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
            console.debug(
                `[worker: ${info.workerIndex}] [browser: ${info.project.name}] user ${account.username} sourced, testing...`,
            );
            await use(account);
            await releaseAccount(account);
            console.debug(
                `[worker: ${info.workerIndex}] [browser: ${info.project.name}] completed testing for the worker and user account released (${account.username})`,
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

    gameInfo: async ({ page }, use) => {
        const gameInfo: GameInfo = getGameInfoPage(page);
        await gameInfo.goTo();
        await use(gameInfo);
    },

    homepage: async ({ page }, use) => {
        const homepage: Homepage = getHomePage(page);
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

test.afterEach(({}, testInfo) => {
    testInfo.attachments.forEach((attachment) => {
        testInfo.annotations.push({
            type: 'testrail_attachment',
            description: attachment.path?.replace(`${cwd()}/`, ''),
        });
    });
});

test.afterAll(({}, testInfo) => {
    testInfo.attachments.forEach((attachment) => {
        const description = attachment.path?.replace(`${cwd()}/`, '');
        if (testInfo.annotations.find((annotation) => annotation.description === description)) {
            return;
        }
        testInfo.annotations.push({
            type: 'testrail_attachment',
            description,
        });
    });
});
