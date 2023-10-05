import { Locator } from '@playwright/test';

import PageObject from './object';

export default abstract class Homepage extends PageObject {
    public async open() {
        return await super.open('');
    }

    public async openLogin() {
        await this.loginBtn.waitFor();
        await this.loginBtn.click();
    }

    public async openMyAccount() {
        await this.myAccountBtn.waitFor();
        await this.myAccountBtn.click();
    }

    /****************************************************************
     * Locators                                                     *
     * The locators here are either the most constent or from Vegas *
     ****************************************************************/
    get balanceDisplay(): Locator {
        return this.page.locator('span[data-qa="user-balance"]');
    }

    get loginBtn(): Locator {
        return this.page.locator('button[data-qa="login-button"]');
    }

    get myAccountBtn(): Locator {
        return this.page.locator('button[data-qa="account-button"]');
    }
}
