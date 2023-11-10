// @ts-check

import { expect, test } from '../src/playwright';

test.describe('site loads', () => {
    test('test that the website loads @test @staging @live @desktop @mobile @tablet', async ({
        homepage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. observe the join button is available',
        });
        await expect(homepage.joinBtn).toBeVisible();
    });

    test('test navigating to the promotions page @test @staging @live @desktop @mobile @tablet', async ({
        homepage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. select promotions from the top navigation',
        });
        await homepage.promotionsBtn.click();
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. check the url contains "promotions"',
        });
        await homepage.page.waitForURL('**/promotions');
        expect(homepage.page.url()).toContain('promotions');
    });
});
