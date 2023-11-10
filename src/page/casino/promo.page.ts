import { Locator } from '@playwright/test';

import Promotions from '../promotions.page';

export default class CasinoPromotions extends Promotions {
    async getPromoDetailsSlug(tile: Locator): Promise<string> {
        const slug = await tile.locator('..').getAttribute('href');
        if (!slug) {
            throw new Error('no promo link found!');
        }
        return slug;
    }
    /********************************************
     * Locators                                 *
     ********************************************/
    get promoTile(): Locator {
        return this.page.locator('div[data-qa="promotion-tile"]').first();
    }

    get promoTiles(): Locator {
        return this.page.locator('div[data-qa="promotion-tile"]');
    }

    get featuredPromoBanner(): Locator {
        return this.page.locator('div[data-qa="promotion-grid-featured"]');
    }

    get activePromosGrid(): Locator {
        return this.page.locator('div[data-qa="promotion-grid-active"]');
    }

    get availablePromosGrid(): Locator {
        return this.page.locator('div[data-qa="promotion-grid-available"]');
    }

    get promoTimer(): Locator {
        return this.page.locator('div[data-qa="time-left"]');
    }

    get promoDetailsPage(): Locator {
        return this.page.locator('section[data-track="Promotion Detail"]');
    }

    get exclusivePromoHeader(): Locator {
        throw new Error('not implemented on bingo');
    }

    get exclusivePromoLink(): Locator {
        throw new Error('not implemented on bingo');
    }

    get latestPromosContainer(): Locator {
        throw new Error('not implemented on bingo');
    }

    get latestPromoLinks(): Locator {
        throw new Error('not implemented on bingo');
    }
}
