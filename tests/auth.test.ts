// @ts-check

import { expect, test } from '../src/playwright';

test.describe('Authentication tests', () => {
    test('login', async ({ account, container, homepage }) => {
        await homepage.goTo();
        await container.login(account);

        await expect(container.balanceDisplay).toBeVisible();
        await expect(container.myAccountBtn).toBeVisible();
    });

    test('logout', async ({ account, container, homepage }) => {
        // Login
        await homepage.goTo();
        await container.login(account);

        // Logout
        await container.logout();

        await expect(container.loginBtn).toBeVisible();
        await expect(container.balanceDisplay).toBeHidden();
        await expect(container.myAccountBtn).toBeHidden();
    });
});
