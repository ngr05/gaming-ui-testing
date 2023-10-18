import { Locator } from '@playwright/test';

import ProductContainer from '../productContainer.component';

export default class VegasContainer extends ProductContainer {
    /********************************************
     * Locators                                 *
     ********************************************/
    get balanceDisplay(): Locator {
        return this.page.locator('p[data-qa="user-balance"]');
    }
}
