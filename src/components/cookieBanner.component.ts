import { Locator, Page } from '@playwright/test';

import ComponentObject from './object';
import debug from '../utils/debug';

export default class CookieBanner extends ComponentObject {
    private cookiesDismissed = false;

    constructor(page: Page) {
        super(page);
    }

    public async acceptCookies(): Promise<void> {
        if (await this.banner.isHidden()) {
            return;
        }
        await this.acceptAllBtn.click();
    }

    public async disbleThirdPartyCookies(): Promise<void> {
        await this.manageCookiesLink.click();
        await this.thirdPartyCookieSwitch.click({ timeout: 5000 });
        await this.confirmCookiePrefsBtn.click();
        await this.page.waitForLoadState();
    }

    public async dismissIfVisible(): Promise<void> {
        try {
            if (!this.cookiesDismissed || (await this.banner.isVisible())) {
                await this.banner.waitFor({ timeout: 10000 });
                await this.acceptCookies();
                this.cookiesDismissed = true;
            }
        } catch (e) {
            if (!this.page.isClosed() && (await this.geoBlockedHeader.isVisible())) {
                throw new Error('site geo blocked!');
            }
            await debug(
                this.page,
                `There was the following error with the cookie banner. Was it there?\n    ${(e as Error).message}`,
                'cookie-banner-error',
            );
        }
    }

    public async rejectCookies(): Promise<void> {
        await this.manageCookiesBtn.click();
        await this.allowNecessaryBtn.click();
    }

    public async waitToBeVisible(): Promise<void> {
        try {
            await this.banner.waitFor({ timeout: 10000 });
        } catch (e) {
            if (!this.page.isClosed() && (await this.geoBlockedHeader.isVisible())) {
                throw new Error('site geo blocked!');
            }
            await debug(
                this.page,
                `There was the following error with the cookie banner. Was it there?\n    ${(e as Error).message}`,
                'cookie-banner-error',
            );
            throw e;
        }
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

    get geoBlockedHeader(): Locator {
        return this.page.getByRole('heading', {
            name: "WE'RE UNAVAILABLE IN YOUR LOCATION",
        });
    }

    get manageCookiesBtn(): Locator {
        return this.page.locator('#onetrust-pc-btn-handler', {
            hasText: 'Manage Cookies',
        });
    }

    get manageCookiesLink(): Locator {
        return this.page.locator('button[data-qa="footer-cookie-management"]');
    }

    get allowNecessaryBtn(): Locator {
        return this.page.locator('.ot-pc-refuse-all-handler');
    }

    get thirdPartyCookieSwitch(): Locator {
        // return this.page.locator('#ot-group-id-C0004');
        return this.page.locator('[data-optanongroupid="C0004"] .ot-switch-nob');
    }

    get confirmCookiePrefsBtn(): Locator {
        return this.page.locator('.onetrust-close-btn-handler');
    }
}
