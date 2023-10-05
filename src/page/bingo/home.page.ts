import { Locator } from '@playwright/test';
import Homepage from '../home.page';

export default class BingoHomepage extends Homepage {
    /********************************************
     * Locators                                 *
     ********************************************/
    get balanceDisplay(): Locator {
        return this.page.locator('span[data-qa="account-balance"]');
    }

    get loginBtn(): Locator {
        return this.page.locator('a[data-qa="account-log-in"]');
    }

    get myAccountBtn(): Locator {
        return this.page.locator('a[data-qa="account-view-account"]');
    }
}
