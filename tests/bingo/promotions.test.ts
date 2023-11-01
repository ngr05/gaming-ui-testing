// @ts-check

import { getCookieObject } from '../../src/config/cookies';
import { expect, test } from '../../src/playwright';
import BingoPromotions from '../../src/page/bingo/promo.page';
import BingoHomepage from '../../src/page/bingo/home.page';

test.describe('Sky Bingo promotion tests', () => {
    test.beforeEach(async ({ promoPage }, testInfo) => {
        if (process.env.BRANCH && process.env.PRODUCT === 'bingo') {
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: 'pre test - add the qa build cookie if needed',
            });
            await promoPage.addCookie(getCookieObject('qabuild', process.env.BRANCH));
        }
    });

    test('Test that an invalid promotion code returns a VF response @staging @live @nps @desktop', async ({
        account,
        container,
        homepage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the Sky Bingo home page' });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
        await container.login(account);
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. open the bingo lobby to ensure the user is synced to VF',
        });
        await (homepage as BingoHomepage).navigateToPlayBingo();

        testInfo.annotations.push({ type: 'testrail_result_comment', description: '4. go to the promotions page' });
        const promoPage = (await homepage.navigateToPromotions()) as BingoPromotions;

        testInfo.annotations.push({ type: 'testrail_result_comment', description: '5. input a random promo code' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '6. attempt to redeem the promotions',
        });
        await promoPage.redeemPromotion('invalid_promotion_code');
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '7. observe a relevant error message is displayed',
        });
        await expect(promoPage.codeRejectedMsg).toBeVisible();
    });
});
