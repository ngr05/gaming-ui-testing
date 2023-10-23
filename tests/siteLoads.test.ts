// @ts-check

import { expect, test } from '../src/playwright';

test.describe('site loads', () => {
    test('test that the website loads @test @staging @live @desktop @mobile @tablet', async ({ homepage }) => {
        await expect(homepage.joinBtn).toBeVisible();
    });

    test('test navigating to the promotions page @test @staging @live @desktop @mobile @tablet', async ({
        homepage,
    }) => {
        await homepage.promotionsBtn.click();
        await homepage.page.waitForURL('**/promotions');
        expect(homepage.page.url()).toContain('promotions');
    });
});
