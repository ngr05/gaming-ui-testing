import { Locator, Page } from '@playwright/test';

import ComponentObject from './object';

export default class CookieBanner extends ComponentObject {
    constructor(page: Page) {
        super(page);
    }

    public async acceptCookies(): Promise<void> {
        if (await this.banner.isHidden()) {
            return;
        }
        await this.acceptAllBtn.click();
    }

    public async rejectCookies(): Promise<void> {
        await this.manageCookiesBtn.click();
        await this.rejectAllBtn.click();
    }

    /********************************************
     * Locators                                 *
     ********************************************/
    get acceptAllBtn(): Locator {
        return this.page.locator('#onetrust-accept-btn-handler');
    }

    get banner(): Locator {
        return this.page.locator('#onetrust-banner-sdk');
    }

    get manageCookiesBtn(): Locator {
        return this.page.locator('#onetrust-pc-btn-handler', {
            hasText: 'Manage Cookies',
        });
    }

    get rejectAllBtn(): Locator {
        return this.page.locator('.ot-pc-refuse-all-handler');
    }
}
