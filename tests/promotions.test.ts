// @ts-check

import { Locator } from '@playwright/test';

import { expect, test } from '../src/playwright';
import { Product, skipOn } from '../src/product';
import { getCookieObject } from '../src/config/cookies';

// PLP = Promotions List Page
// PDP = Promotion Details Page

test.describe('Sky Gaming promotion tests', () => {
    test.beforeEach(async ({ promoPage }, testInfo) => {
        if (process.env.BRANCH) {
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: 'pre test - add the branch cookie if needed',
            });

            let key = '';
            if (process.env.PRODUCT === 'casino') {
                key = 'skycasino-aws-01';
            }
            if (process.env.PRODUCT === 'bingo') {
                key = 'qabuild';
            }
            await promoPage.addCookie(getCookieObject(key, process.env.BRANCH));
        }
    });

    test('Test that promotional content appears @test @staging @live @nps @desktop @mobile @tablet', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Bingo promotions page',
        });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. observe the list of promotions are displayed',
        });
        await expect(promoPage.availablePromosGrid).toBeVisible();
        await expect(promoPage.promoTile).toBeVisible();
    });

    test('Test you can see featured promotion after navigation @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the product promotions page',
        });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. observe promotions are listed' });
        await expect(promoPage.featuredPromoBanner).toBeVisible();
    });

    test('Test breadcrumbs display correctly on page navigation @test @live @desktop @mobile @tablet', async ({
        container,
        promoPage,
    }, testInfo) => {
        skipOn(Product.VEGAS, 'functionality not on vegas');

        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the product promotions page',
        });
        const breadcrumbs: Locator = container.breadcrumbs;
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. check that the breadcrumbs are visible on the page',
        });
        await breadcrumbs.isVisible();
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. check that the breadcrumbs include the product root',
        });
        await expect(breadcrumbs).toContainText(container.initalBreadcrumb);
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '4. check that the breadcrumbs include "Promotions"',
        });
        await expect(breadcrumbs).toContainText(promoPage.promotionsBreadcrumb);

        testInfo.annotations.push({ type: 'testrail_result_comment', description: '5. select one of the promo cards' });
        const promotionBreadcrumb = await promoPage.getPromotionDetailsBreadcrumb();
        await promoPage.promoTile.click();
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '6. observe the navigation to relevant promotion page',
        });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description:
                '7. observe the same initial two elements are in the breadcrumbs as well as "Promotion Details" now being added',
        });

        await expect(breadcrumbs).toContainText(container.initalBreadcrumb);
        await expect(breadcrumbs).toContainText(promoPage.promotionsBreadcrumb);
        await expect(breadcrumbs).toContainText(promotionBreadcrumb);
    });

    test.describe('when logged in', () => {
        test('Test that as a guest clicking on a PLP card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
            account,
            container,
            page,
            promoPage,
        }, testInfo) => {
            testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '1. go to the product promotions page',
            });
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
            await container.login(account);

            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '3. select the first promo card',
            });
            await promoPage.promoTile.waitFor();
            // thing Bingo promo page appears to be taking up to a second to do something I can't work out which means
            // that the click on the tile is happening too quickly
            await page.waitForTimeout(1000);
            const slug = await promoPage.getPromoDetailsSlug(promoPage.promoTile);
            await promoPage.promoTile.click();

            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '4. observe that you are taken to the promo detail page and it is the correct promo',
            });
            await promoPage.promoDetailsPage.waitFor({ timeout: 5000 });
            expect(promoPage.page.url()).toMatch(new RegExp(`.+${slug}?$`));
        });
    });

    test('Test you can see time left for promotions @test @live @desktop @mobile @tablet', async ({
        promoPage,
    }, testInfo) => {
        skipOn(Product.BINGO, 'no timers on Bingo');

        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the product promotions page',
        });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. observe promos with time limits display the time limit',
        });
        await expect(promoPage.promoTimer.first()).toBeVisible();
    });

    test('Test that as a guest clicking on a PLP card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the product promotions page',
        });

        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. select the first promo card' });
        await promoPage.promoTile.waitFor();
        const slug = await promoPage.getPromoDetailsSlug(promoPage.promoTile);
        await promoPage.promoTile.click();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. observe that you are taken to the promo detail page and it is the correct promo',
        });
        await promoPage.promoDetailsPage.waitFor();
        expect(promoPage.page.url()).toMatch(new RegExp(`.+${slug}?$`));
    });
});
