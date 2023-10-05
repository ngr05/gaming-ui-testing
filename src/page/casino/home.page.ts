import { Locator } from '@playwright/test';
import Homepage from '../home.page';

export default class CasinoHomepage extends Homepage {
    /********************************************
     * Locators                                 *
     ********************************************/
    get myAccountBtn(): Locator {
        return this.page.locator('span[data-qa="account-open"]');
    }
}
