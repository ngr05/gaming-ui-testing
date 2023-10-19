import { Locator } from '@playwright/test';

import PageObject from '../object';

import Homepage from '../home.page';
import CasinoPromotions from './promo.page';

export default class CasinoHomepage extends Homepage {
    protected getPromoPageObject(): PageObject {
        return new CasinoPromotions(this.page);
    }
    /****************************************************************
     * Locators                                                     *
     ****************************************************************/
    get promotionsBtn(): Locator {
        return this.page.locator('span[data-qa="Promotions"]');
    }
}
