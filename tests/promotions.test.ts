// @ts-check

import { test } from '../src/playwright';

// PLP = Promotions List Page
// PDP = Promotion Details Page

test.describe('Promotion tests', () => {
    test('Test that as a guest clicking on a PLP card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }) => {
        await promoPage.selectCardAndVerify(promoPage.cardLinks.first());
    });

    test('Test that as a guest clicking on a PLP Exclusively for you card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }) => {
        const hasExclusivePromo = await promoPage.exclusivePromoLink.isVisible();

        if (hasExclusivePromo) {
            await promoPage.exclusivePromoHeader.isVisible();
            await promoPage.selectCardAndVerify(promoPage.exclusivePromoLink);
        }
    });

    test('Test that as a guest clicking on a PLP latest promotions card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }) => {
        const hasLatestPromo = await promoPage.latestPromosRow.isVisible();

        if (hasLatestPromo) {
            await promoPage.latestPromoLinks.first().isVisible();
            await promoPage.selectCardAndVerify(promoPage.latestPromoLinks.first());
        }
    });

    test('Test that as a logged in customer clicking on PLP card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        account,
        promoPage,
    }) => {
        // await I.loginWithRetryBasePage();
        // I.waitForVisible(fragments.promotions.PROMO_CARD_LINKS);
        // await I.clickCardAndVerifyNavigation(fragments.promotions.PROMO_CARD_LINKS);
        await promoPage.login(account);
        await promoPage.selectCardAndVerify(promoPage.cardLinks.first());
    });

    test('Test that as a logged in customer clicking on a PLP Exclusively for you card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        account,
        promoPage,
    }) => {
        // await I.loginWithRetryBasePage();
        // const userHasExclusivePromotion = await I.checkElementExists(fragments.promotions.EXCLUSIVELY_FOR_YOU_ROW);

        // if (userHasExclusivePromotion) {
        //     I.see(fragments.promotions.EXCLUSIVELY_FOR_YOU_HEADER);
        //     await I.clickCardAndVerifyNavigation(fragments.promotions.EXCLUSIVELY_FOR_YOU_LINKS);
        // }
        await promoPage.login(account);
        const hasExclusivePromo = await promoPage.exclusivePromoLink.isVisible();

        if (hasExclusivePromo) {
            await promoPage.exclusivePromoHeader.isVisible();
            await promoPage.selectCardAndVerify(promoPage.exclusivePromoLink);
        }
    });

    test('Test that as a logged in customer on a PLP latest promotions card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        account,
        promoPage,
    }) => {
        // await I.loginWithRetryBasePage();
        // I.wait(10); // Wait to ensure latest promotions row is available before clicking

        // const hasLatestPromotionsSection = await I.checkElementExists(fragments.promotions.LATEST_PROMOS_ROW);

        // if (hasLatestPromotionsSection) {
        //     I.waitForVisible(fragments.promotions.LATEST_PROMOS_ROW_CARD_LINKS);
        //     await I.clickCardAndVerifyNavigation(fragments.promotions.LATEST_PROMOS_ROW_CARD_LINKS);
        // }
        await promoPage.login(account);
        const hasLatestPromo = await promoPage.latestPromosRow.isVisible();

        if (hasLatestPromo) {
            await promoPage.latestPromoLinks.first().isVisible();
            await promoPage.selectCardAndVerify(promoPage.latestPromoLinks.first());
        }
    });
});
