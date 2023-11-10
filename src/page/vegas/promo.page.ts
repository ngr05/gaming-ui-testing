import { Locator } from '@playwright/test';

import Promotions from '../promotions.page';

export default class VegasPromotions extends Promotions {
    readonly exclusivePromoHeading = 'Exclusively for you';

    getPromotionDetailsBreadcrumb(): Promise<string> {
        return new Promise((res, rej) => rej('testing not implemented for vegas yet!'));
    }

    async getPromoDetailsSlug(tile: Locator): Promise<string> {
        const slug = await tile.getAttribute('href');
        if (!slug) {
            throw new Error('no promo link found!');
        }
        return slug;
    }

    /********************************************
     * Locators                                 *
     ********************************************/
    get promoTile(): Locator {
        return this.page.locator('a[data-qa^="pr-card-link-"]').first();
    }

    get promoTiles(): Locator {
        return this.page.locator('a[data-qa^="pr-card-link-"]');
    }

    get featuredPromoBanner(): Locator {
        return this.page.locator('div[data-qa="pr-row-featured"]');
    }

    get activePromosGrid(): Locator {
        return this.page.locator('div[data-track="promotion-grid-your-promotions"]');
    }

    get availablePromosGrid(): Locator {
        return this.page.locator('div[data-qa="pr-row-latest-pr"]');
    }

    get promoTimer(): Locator {
        return this.page.locator('span:has-text("days left")');
    }

    get promoDetailsPage(): Locator {
        return this.page.locator('div[data-track^="PDP"]');
    }

    get exclusivePromoHeader(): Locator {
        return this.page.getByRole('heading', { name: this.exclusivePromoHeading });
    }

    get exclusivePromoLink(): Locator {
        return this.page.locator('[data-qa="promotion-row-exclusive"]');
    }

    get latestPromosContainer(): Locator {
        return this.page.locator('[data-qa^="promotion-row-latest-promotions"]');
    }

    get latestPromoLinks(): Locator {
        return this.page.locator('[data-qa^="promo-card-link-latest-promotions-"]');
    }
}
