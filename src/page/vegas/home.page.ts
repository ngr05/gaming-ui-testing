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
    get joinBtn(): Locator {
        return this.page.locator('button[data-qa="register-button"]');
    }

    get promotionsBtn(): Locator {
        return this.page.locator('a[data-qa="promotions"]');
    }

    get saferGamblingBtn(): Locator {
        return this.page.locator('div[data-qa="safer-gambling-shield"]');
    }
}
