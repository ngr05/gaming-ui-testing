import { Locator } from '@playwright/test';

import { expect } from '../playwright';
import PageObject from '../page/object';
import { Customer } from '../utils/customer';

export default abstract class ProductContainer extends PageObject {
    public async login(account: Customer): Promise<void> {
        await this.openSidebar();
        await this.sidebar.performLogin(account);
        await this.waitForUserToBeLoggedIn();
    }

    public async logout(): Promise<void> {
        await this.openSidebar();
        await this.sidebar.performLogout();
        await this.waitForUserToBeLoggedOut();
    }

    public async openSidebar(): Promise<void> {
        // when the page renders, on casino specifically, the shell of the site does not display a login or account
        // button so we need to wait for one or the other to appear before we can continue.
        await Promise.any([this.loginBtn.waitFor(), this.myAccountBtn.waitFor()]);
        if (await this.loginBtn.isVisible()) {
            await this.loginBtn.click();
        } else {
            await this.myAccountBtn.click();
        }
        await this.sidebar.waitToBeOpen();
    }

    public async userIsLoggedIn(): Promise<void> {
        await expect(this.balanceDisplay).toBeVisible();
        await expect(this.loginBtn).toBeHidden();
        await expect(this.myAccountBtn).toBeVisible();
    }

    public async userIsLoggedOut(): Promise<void> {
        await expect(this.balanceDisplay).toBeHidden();
        await expect(this.loginBtn).toBeVisible();
        await expect(this.myAccountBtn).toBeHidden();
    }

    public async waitForUserToBeLoggedIn(): Promise<void> {
        await this.loginBtn.waitFor({ state: 'hidden' });
        await this.myAccountBtn.waitFor();
    }

    public async waitForUserToBeLoggedOut(): Promise<void> {
        await this.loginBtn.waitFor();
        await this.myAccountBtn.waitFor({ state: 'hidden' });
    }

    abstract get initalBreadcrumb(): string;

    /****************************************************************
     * Locators                                                     *
     * These need to be dfined on a product by product basis.       *
     ****************************************************************/
    get balanceDisplay(): Locator {
        return this.page.locator('span[data-qa="user-balance"]');
    }

    abstract get breadcrumbs(): Locator;

    get loginBtn(): Locator {
        return this.page.locator('button[data-qa="login-button"]');
    }

    get myAccountBtn(): Locator {
        return this.page.locator('button[data-qa="account-button"]');
    }
}
