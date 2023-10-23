// @ts-check

import { expect, test } from '../src/playwright';
import { skipOnBingo } from '../src/product';

test.describe('Safer Gambling testing', () => {
    test.beforeEach(async ({ setup }) => {
        await setup.setDefaultCookies();
    });

    test('Test clicking the safer gambling shield when logged out opens the account bar @test @staging @live @desktop @mobile @tablet', async ({
        homepage,
    }) => {
        skipOnBingo('safer gambling works a bit different here');

        await homepage.saferGamblingBtn.waitFor();
        await homepage.saferGamblingBtn.click();
        await expect(homepage.sidebar.myAccountIndicator).toBeVisible();
    });

    test('Test clicking the safer gambling shield when logged in opens deposit limit @test @staging @live @desktop @mobile @tablet', async ({
        account,
        container,
        homepage,
    }) => {
        skipOnBingo('safer gambling works a bit different here');

        await container.login(account);

        await homepage.saferGamblingBtn.waitFor();
        await homepage.saferGamblingBtn.click();
        await expect(homepage.sidebar.myAccountIndicator).toBeVisible();

        await expect(homepage.sidebar.depositLimitBtn).toBeVisible();
        await expect(homepage.sidebar.coolOffBtn).toBeVisible();
        await expect(homepage.sidebar.selfExclusionBtn).toBeVisible();
        await expect(homepage.sidebar.realityCheckBtn).toBeVisible();
        await expect(homepage.sidebar.closeMyAccountBtn).toBeVisible();
    });
});
