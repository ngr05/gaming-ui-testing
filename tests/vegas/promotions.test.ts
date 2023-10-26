// @ts-check

import { test } from '../../src/playwright';

// PLP = Promotions List Page
// PDP = Promotion Details Page

test.describe('Sky Vegas promotion tests', () => {
    test('Test that as a guest clicking on a PLP card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Vegas promotions page',
        });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. select the first promo card' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. observe that you are taken to the promo detail page and it is the correct promo',
        });
        await promoPage.selectCardAndVerify(promoPage.cardLinks.first());
    });

    test('Test that as a guest clicking on a PLP Exclusively for you card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Vegas promotions page',
        });
        const hasExclusivePromo = await promoPage.exclusivePromoLink.isVisible();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. select an exclusive promo if there is one',
        });
        if (hasExclusivePromo) {
            await promoPage.exclusivePromoHeader.isVisible();
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '3. select the promotion card' });
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '4. observe the relevant promotion details page is opened',
            });
            await promoPage.selectCardAndVerify(promoPage.exclusivePromoLink);
        }
    });

    test('Test that as a guest clicking on a PLP latest promotions card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Vegas promotions page',
        });
        const hasLatestPromo = await promoPage.latestPromosRow.isVisible();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. select the latest promo if there is one',
        });
        if (hasLatestPromo) {
            await promoPage.latestPromoLinks.first().isVisible();
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '3. select the promotion card' });
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '4. observe the relevant promotion details page is opened',
            });
            await promoPage.selectCardAndVerify(promoPage.latestPromoLinks.first());
        }
    });

    test('Test that as a logged in customer clicking on PLP card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        account,
        container,
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Vegas promotions page',
        });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
        await container.login(account);
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. check that the user is logged in',
        });
        await container.userIsLoggedIn();
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '4. observe that you are taken to the promo detail page and it is the correct promo',
        });
        await promoPage.selectCardAndVerify(promoPage.cardLinks.first());
    });

    test('Test that as a logged in customer clicking on a PLP Exclusively for you card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        account,
        container,
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Vegas promotions page',
        });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
        await container.login(account);
        const hasExclusivePromo = await promoPage.exclusivePromoLink.isVisible();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. select an exclusive promo if there is one',
        });
        if (hasExclusivePromo) {
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '4. check that the user is logged in',
            });
            await container.userIsLoggedIn();
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '5. select the promotion card' });
            await promoPage.exclusivePromoHeader.isVisible();
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '6. observe the relevant promotion details page is opened',
            });
            await promoPage.selectCardAndVerify(promoPage.exclusivePromoLink);
        }
    });

    test('Test that as a logged in customer on a PLP latest promotions card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        account,
        container,
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Vegas promotions page',
        });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
        await container.login(account);
        const hasLatestPromo = await promoPage.latestPromosRow.isVisible();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. select the latest promo if there is one',
        });
        if (hasLatestPromo) {
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '4. check that the user is logged in',
            });
            await container.userIsLoggedIn();
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '5. select the promotion card' });
            await promoPage.latestPromoLinks.first().isVisible();
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '6. observe the relevant promotion details page is opened',
            });
            await promoPage.selectCardAndVerify(promoPage.latestPromoLinks.first());
        }
    });
});
