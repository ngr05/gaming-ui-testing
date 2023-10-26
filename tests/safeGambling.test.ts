// @ts-check

import { expect, test } from '../src/playwright';
import { skipOnBingo } from '../src/product';

test.describe('Safer Gambling testing', () => {
    test.beforeEach(async ({ setup }) => {
        await setup.setDefaultCookies();
    });

    test('clicking the safer gambling shield when logged out opens the account bar @test @staging @live @desktop @mobile @tablet', async ({
        homepage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'GUI-1' });

        skipOnBingo('safer gambling works a bit different here');

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. click the safer gambling button once visible',
        });
        await homepage.saferGamblingBtn.waitFor();
        await homepage.saferGamblingBtn.click();
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. check that the sidebar is open',
        });
        await expect(homepage.sidebar.myAccountIndicator).toBeVisible();
        throw new Error('something');
    });

    test('clicking the safer gambling shield when logged in opens deposit limit @test @staging @live @desktop @mobile @tablet', async ({
        account,
        container,
        homepage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'GUI-1' });

        skipOnBingo('safer gambling works a bit different here');

        testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. login to the portal' });
        await container.login(account);

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. click the safer gambling button once visible',
        });
        await homepage.saferGamblingBtn.waitFor();
        await homepage.saferGamblingBtn.click();
        await expect(homepage.sidebar.myAccountIndicator).toBeVisible();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. check that the sidebar is open on the safer gambling options',
        });
        await expect(homepage.sidebar.depositLimitBtn).toBeVisible();
        await expect(homepage.sidebar.coolOffBtn).toBeVisible();
        await expect(homepage.sidebar.selfExclusionBtn).toBeVisible();
        await expect(homepage.sidebar.realityCheckBtn).toBeVisible();
        await expect(homepage.sidebar.closeMyAccountBtn).toBeVisible();
    });

    test('navigating through the sidebar to the safer gambling tools @test @staging @live @desktop @mobile @tablet', async ({
        account,
        container,
        homepage,
    }) => {
        await container.login(account);

        await container.myAccountBtn.waitFor();
        await container.myAccountBtn.click();
        await container.sidebar.myAccountIndicator.waitFor();

        await container.sidebar.saferGamblingToolsBtn.waitFor();
        await container.sidebar.saferGamblingToolsBtn.click();

        await expect(homepage.sidebar.depositLimitBtn).toBeVisible();
        await expect(homepage.sidebar.coolOffBtn).toBeVisible();
        await expect(homepage.sidebar.selfExclusionBtn).toBeVisible();
        await expect(homepage.sidebar.realityCheckBtn).toBeVisible();
        await expect(homepage.sidebar.closeMyAccountBtn).toBeVisible();
    });
});
