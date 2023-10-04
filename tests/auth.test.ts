// @ts-check

import { expect } from '@playwright/test';

import { test } from '../src/playwright';
import { getAccount } from '../src/utils/customer';

test.describe('Authentication tests', () => {
    test.beforeEach(async ({ homepage }, testInfo) => {
        console.log(`running ${testInfo.title}`);
        await homepage.open();
    });

    test('login', async ({ homepage }) => {
        await homepage.openLogin();
        const account = await getAccount();
        await homepage.sidebar.login(account);

        await expect(homepage.balanceDisplay).toBeVisible();
        await expect(homepage.myAccountBtn).toBeVisible();
    });

    test('logout', async ({ homepage }) => {
        // Login
        await homepage.openLogin();
        const account = await getAccount();
        await homepage.sidebar.login(account);

        // Logout
        await homepage.openMyAccount();
        await homepage.sidebar.logout();

        await expect(homepage.loginBtn).toBeVisible();
        await expect(homepage.balanceDisplay).toBeHidden();
        await expect(homepage.myAccountBtn).toBeHidden();
    });
});
