// @ts-check

import { expect, test } from '../src/playwright';

test.describe('Authentication tests', () => {
    test('login', async ({ account, homepage }) => {
        await homepage.openLogin();
        await homepage.sidebar.login(account);

        await expect(homepage.balanceDisplay).toBeVisible();
        await expect(homepage.myAccountBtn).toBeVisible();
    });

    test('logout', async ({ account, homepage }) => {
        // Login
        await homepage.openLogin();
        await homepage.sidebar.login(account);

        // Logout
        await homepage.openMyAccount();
        await homepage.sidebar.logout();

        await expect(homepage.loginBtn).toBeVisible();
        await expect(homepage.balanceDisplay).toBeHidden();
        await expect(homepage.myAccountBtn).toBeHidden();
    });
});
