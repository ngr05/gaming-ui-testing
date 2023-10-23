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
    get joinBtn(): Locator {
        return this.page.locator('button[data-qa="join-button"]');
    }

    get promotionsBtn(): Locator {
        return this.page.locator('#cs-account [data-qa="Promotions"]');
    }

    get saferGamblingBtn(): Locator {
        return this.page.locator('button[data-qa="safer-gambling-banner"]').first();
    }
}
