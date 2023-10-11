import { Locator } from '@playwright/test';

import ProductContainer from '../productContainer.component';

export default class CasinoHomepage extends ProductContainer {
    /********************************************
     * Locators                                 *
     ********************************************/
    get myAccountBtn(): Locator {
        return this.page.locator('span[data-qa="account-open"]');
    }
}
