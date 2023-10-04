import { Locator, Page } from '@playwright/test';
import PageObject from './object';

export default class Homepage extends PageObject {
    constructor(page: Page) {
        super(page);
    }

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

    /********************************************
     * Locators                                 *
     ********************************************/
    get balanceDisplay(): Locator {
        return this.page.locator('p[data-qa="user-balance"]');
    }

    get loginBtn(): Locator {
        return this.page.locator('button[data-qa="login-button"]');
    }

    get myAccountBtn(): Locator {
        return this.page.locator('button[data-qa="account-button"]');
    }
}
