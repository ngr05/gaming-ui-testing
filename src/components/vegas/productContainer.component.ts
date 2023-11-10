import { Locator } from '@playwright/test';

import ProductContainer from '../productContainer.component';

export default class VegasContainer extends ProductContainer {
    readonly initalBreadcrumb = '';

    /********************************************
     * Locators                                 *
     ********************************************/
    get balanceDisplay(): Locator {
        return this.page.locator('p[data-qa="user-balance"]');
    }

    get breadcrumbs(): Locator {
        throw new Error('there are no breadcrumbs on Vegas');
    }
}
