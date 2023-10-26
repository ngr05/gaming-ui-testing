// @ts-check

import { Locator } from '@playwright/test';

import CasinoContainer from '../../src/components/casino/productContainer.component';
import { getCookieObject } from '../../src/config/cookies';
import { expect, test } from '../../src/playwright';

test.describe('Sky Casino promotion tests', () => {
    test.beforeEach(async ({ promoPage }, testInfo) => {
        if (process.env.BRANCH && process.env.PRODUCT === 'casino') {
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: 'pre test - add the branch cookie if needed',
            });
            await promoPage.addCookie(getCookieObject('skycasino-aws-01', process.env.BRANCH));
        }
    });

    test('Test you can see featured promotion after navigation @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Casino promotions page',
        });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. observe promotions are listed' });
        await expect(promoPage.featuredPromosGrid).toBeVisible();
    });

    test('Test you can cannot see active promotions when logged out @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Casino promotions page',
        });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. observe there are no active promotions',
        });
        await expect(promoPage.activePromosGrid).toBeHidden();
        await expect(promoPage.availablePromosGrid).toBeVisible();
    });

    test('Test you can view active & available promotions when logged in @test @live @desktop @mobile @tablet', async ({
        account,
        container,
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Casino promotions page',
        });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
        await container.login(account);
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. observe there are active and available promotions are displayed',
        });
        await expect(promoPage.activePromosGrid).toBeVisible();
        await expect(promoPage.availablePromosGrid).toBeVisible();
    });

    test('Test you can see time left for promotions @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Casino promotions page',
        });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. observe promos with time limits display the time limit',
        });
        await expect(promoPage.promoTimer.first()).toBeVisible();
    });

    test('Test you can click promotion tile and the detail page loads @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Casino promotions page',
        });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. select one of the promotion cards',
        });
        await promoPage.promoTile.first().isVisible();
        await promoPage.promoTile.first().click();
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. observe the user is taken to the promo details page for the relevant promotion',
        });
        await expect(promoPage.promoDetailsPage).toBeVisible();
    });

    test('Test breadcrumbs display correctly on page navigation @test @live @desktop @mobile @tablet', async ({
        container,
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Casino promotions page',
        });
        const breadcrumbs: Locator = (container as CasinoContainer).breadcrumbs;
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. check that the breadcrumbs are visible on the page',
        });
        await breadcrumbs.isVisible();
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. check that the breadcrumbs include "Online Casino"',
        });
        await expect(breadcrumbs).toContainText('Online Casino');
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '4. check that the breadcrumbs include "Promotions"',
        });
        await expect(breadcrumbs).toContainText('Promotions');

        testInfo.annotations.push({ type: 'testrail_result_comment', description: '5. select one of the promo cards' });
        await promoPage.promoTile.first().click();
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '6. observe the navigation to relevant promotion page',
        });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description:
                '7. observe the same initial two elements are in the breadcrumbs as well as "Promotion Details" now being added',
        });
        await expect(breadcrumbs).toContainText('Online Casino');
        await expect(breadcrumbs).toContainText('Promotions');
        await expect(breadcrumbs).toContainText('Promotion Details');
    });
});
