// @ts-check

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

    test.describe('when logged in', () => {
        test('Test you can view active & available promotions when logged in @test @live @desktop @mobile @tablet', async ({
            account,
            container,
            promoPage,
        }, testInfo) => {
            testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
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
    });

    test.describe('when logged out', () => {
        test('Test you can cannot see active promotions when logged out @test @live @desktop @mobile @tablet', async ({
            promoPage,
        }, testInfo) => {
            testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
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
    });
});
