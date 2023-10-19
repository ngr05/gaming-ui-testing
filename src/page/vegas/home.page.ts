import { Locator } from '@playwright/test';

import PageObject from '../object';

import Homepage from '../home.page';
import VegasPromotions from './promo.page';

export default class VegasHomepage extends Homepage {
    protected getPromoPageObject(): PageObject {
        return new VegasPromotions(this.page);
    }

    /****************************************************************
     * Locators                                                     *
     ****************************************************************/
    get promotionsBtn(): Locator {
        return this.page.locator('a[data-qa="promotions"]');
    }
}
