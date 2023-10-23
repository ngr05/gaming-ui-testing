import { FrameLocator, Locator, Page } from '@playwright/test';

import ComponentObject from './object';
import { Customer } from '../utils/customer';

export default class Sidebar extends ComponentObject {
    protected timeout = 5;

    constructor(page: Page) {
        super(page);
    }

    public async waitToBeClosed(): Promise<void> {
        await this.myAccountIndicator.isHidden();
    }

    public async waitToBeOpen(): Promise<void> {
        await this.myAccountIndicator.isVisible({ timeout: this.timeout * 1000 });
    }

    public async performLogin(account: Customer): Promise<void> {
        await this.waitToBeOpen();
        await this.usernameInput.fill(account.username);
        await this.pinInput.fill(account.pin);
        await this.loginBtn.click();
        await this.waitToBeClosed();
    }

    public async performLogout(): Promise<void> {
        await this.waitToBeOpen();
        await this.logoutBtn.click();
        await this.waitToBeClosed();
    }

    /********************************************
     * Locators                                 *
     ********************************************/
    get usernameInput(): Locator {
        return this.frame.locator('#username');
    }

    get pinInput(): Locator {
        return this.frame.locator('#pin');
    }

    get loginBtn(): Locator {
        return this.frame.locator('button[data-qa="login-page-submit"]');
    }

    get logoutBtn(): Locator {
        return this.frame.locator('a[data-qa="menu-logout"]');
    }

    get myAccountBtn(): Locator {
        return this.page.locator('button[data-qa="account-button"]');
    }

    get myAccountIndicator(): Locator {
        return this.page.locator('.sba-open');
    }

    get frame(): FrameLocator {
        return this.page.frameLocator('#SkyBetAccount');
    }

    // safer gambling
    get depositLimitBtn(): Locator {
        return this.frame.locator('a[data-qa="depositLimitLink"]');
    }

    get coolOffBtn(): Locator {
        return this.frame.locator('a[data-qa="coolOffLink"]');
    }

    get selfExclusionBtn(): Locator {
        return this.frame.locator('a[data-qa="selfExclusionLink"]');
    }

    get realityCheckBtn(): Locator {
        return this.frame.locator('a[data-qa="realityCheckLink"]');
    }

    get closeMyAccountBtn(): Locator {
        return this.frame.locator('a[data-qa="closeMyAccountLink"]');
    }
}
