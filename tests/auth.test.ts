// @ts-check

import { expect, test } from '../src/playwright';

test.describe('Authentication tests', () => {
    test('login', async ({ account, container, homepage }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
        await homepage.goTo();
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
        await container.login(account);

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '3. check that the balance and my account is displayed',
        });
        await expect(container.balanceDisplay).toBeVisible();
        await expect(container.myAccountBtn).toBeVisible();
    });

    test('logout', async ({ account, container, homepage }, testInfo) => {
        // Login
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
        await homepage.goTo();
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
        await container.login(account);

        // Logout
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '3. log out from the product' });
        await container.logout();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '4. check that there is no balance or my account but there is a login button',
        });
        await expect(container.loginBtn).toBeVisible();
        await expect(container.balanceDisplay).toBeHidden();
        await expect(container.myAccountBtn).toBeHidden();
    });
});
