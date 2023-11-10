import { Locator } from '@playwright/test';

import PageObject from './object';

export default abstract class Promotions extends PageObject {
    public promotionsBreadcrumb = 'Promotions';

    public async goTo(): Promise<void> {
        return await super.goTo('promotions');
    }

    abstract getPromoDetailsSlug(tile: Locator): Promise<string>;

    getPromotionDetailsBreadcrumb(): Promise<string> {
        return new Promise((res) => res('Promotion Details'));
    }

    /****************************************************************
     * Locators                                                     *
     * All locators are distributed to the products                 *
     ****************************************************************/
    abstract get promoTile(): Locator;
    abstract get promoTiles(): Locator;

    abstract get featuredPromoBanner(): Locator;
    abstract get activePromosGrid(): Locator;
    abstract get availablePromosGrid(): Locator;

    abstract get promoTimer(): Locator;

    abstract get promoDetailsPage(): Locator;

    abstract get exclusivePromoHeader(): Locator;
    abstract get exclusivePromoLink(): Locator;

    abstract get latestPromosContainer(): Locator;
    abstract get latestPromoLinks(): Locator;
}
