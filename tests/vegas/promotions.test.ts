// @ts-check

import { test } from '../../src/playwright';

// PLP = Promotions List Page
// PDP = Promotion Details Page

test.describe('Sky Vegas promotion tests', () => {
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
        container,
        promoPage,
    }) => {
        await container.login(account);
        await container.userIsLoggedIn();
        await promoPage.selectCardAndVerify(promoPage.cardLinks.first());
    });

    test('Test that as a logged in customer clicking on a PLP Exclusively for you card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        account,
        container,
        promoPage,
    }) => {
        await container.login(account);
        const hasExclusivePromo = await promoPage.exclusivePromoLink.isVisible();

        if (hasExclusivePromo) {
            await container.userIsLoggedIn();
            await promoPage.exclusivePromoHeader.isVisible();
            await promoPage.selectCardAndVerify(promoPage.exclusivePromoLink);
        }
    });

    test('Test that as a logged in customer on a PLP latest promotions card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        account,
        container,
        promoPage,
    }) => {
        await container.login(account);
        const hasLatestPromo = await promoPage.latestPromosRow.isVisible();

        if (hasLatestPromo) {
            await container.userIsLoggedIn();
            await promoPage.latestPromoLinks.first().isVisible();
            await promoPage.selectCardAndVerify(promoPage.latestPromoLinks.first());
        }
    });
});
