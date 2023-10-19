// @ts-check

import { getCookieObject } from '../../src/config/cookies';
import { expect, test } from '../../src/playwright';
import BingoPromotions from '../../src/page/bingo/promo.page';
import BingoHomepage from '../../src/page/bingo/home.page';

test.describe('Sky Bingo promotion tests', () => {
    test.beforeEach(async ({ promoPage }) => {
        if (process.env.BRANCH && process.env.PRODUCT === 'bingo') {
            await promoPage.addCookie(getCookieObject('qabuild', process.env.BRANCH));
        }
    });

    test('Test that the correct number of promotional content appears @test @staging @live @nps @desktop @mobile @tablet', async ({
        promoPage,
    }) => {
        await expect(promoPage.currentPromoList).toBeVisible();
        await expect(promoPage.promoImage.first()).toBeVisible();
    });

    test('Test that an invalid promotion code returns a VF response @staging @live @nps @desktop', async ({
        account,
        container,
        homepage,
    }) => {
        await container.login(account);
        await (homepage as BingoHomepage).navigateToPlayBingo();

        const promoPage = (await homepage.navigateToPromotions()) as BingoPromotions;

        await promoPage.redeemPromotion('invalid_promotion_code');
        await expect(promoPage.codeRejectedMsg).toBeVisible();
    });
});
