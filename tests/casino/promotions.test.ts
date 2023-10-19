// @ts-check

import { Locator } from '@playwright/test';

import CasinoContainer from '../../src/components/casino/productContainer.component';
import { getCookieObject } from '../../src/config/cookies';
import { expect, test } from '../../src/playwright';

test.describe('Sky Casino promotion tests', () => {
    test.beforeEach(async ({ promoPage }) => {
        if (process.env.BRANCH && process.env.PRODUCT === 'casino') {
            await promoPage.addCookie(getCookieObject('skycasino-aws-01', process.env.BRANCH));
        }
    });

    test('Test you can see featured promotion after navigation @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }) => {
        await expect(promoPage.featuredPromosGrid).toBeVisible();
    });

    test('Test you can cannot see active promotions when logged out @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }) => {
        await expect(promoPage.activePromosGrid).toBeHidden();
        await expect(promoPage.availablePromosGrid).toBeVisible();
    });

    test('Test you can view active & available promotions when logged in @test @live @desktop @mobile @tablet', async ({
        account,
        container,
        promoPage,
    }) => {
        await container.login(account);
        await expect(promoPage.activePromosGrid).toBeVisible();
        await expect(promoPage.availablePromosGrid).toBeVisible();
    });

    test('Test you can see time left for promotions @test @live @desktop @mobile @tablet', async ({ promoPage }) => {
        await expect(promoPage.promoTimer.first()).toBeVisible();
    });

    test('Test you can click promotion tile and the detail page loads @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }) => {
        await promoPage.promoTile.first().isVisible();
        await promoPage.promoTile.first().click();
        await expect(promoPage.promoDetailsPage).toBeVisible();
    });

    test('Test breadcrumbs display correctly on page navigation @test @live @desktop @mobile @tablet', async ({
        container,
        promoPage,
    }) => {
        const breadcrumbs: Locator = (container as CasinoContainer).breadcrumbs;
        await breadcrumbs.isVisible();
        await expect(breadcrumbs).toContainText('Online Casino');
        await expect(breadcrumbs).toContainText('Promotions');

        await promoPage.promoTile.first().click();
        await expect(breadcrumbs).toContainText('Online Casino');
        await expect(breadcrumbs).toContainText('Promotions');
        await expect(breadcrumbs).toContainText('Promotion Details');
    });
});
