import { Locator } from '@playwright/test';

import ProductContainer from '../productContainer.component';

export default class CasinoContainer extends ProductContainer {
    /********************************************
     * Locators                                 *
     ********************************************/
    get breadcrumbs(): Locator {
        return this.page.locator('ul[data-testid="breadcrumb"]');
    }

    get myAccountBtn(): Locator {
        return this.page.locator('span[data-qa="account-open"]');
    }
}
