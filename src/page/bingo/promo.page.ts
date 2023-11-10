import { Locator } from '@playwright/test';

import Promotions from '../promotions.page';

export default class BingoPromotions extends Promotions {
    public promotionsBreadcrumb = 'Bingo Promotions';

    public async redeemPromotion(code: string): Promise<void> {
        await this.codeInputField.waitFor();
        await this.codeInputField.fill(code);
        await this.redeemPromotionBtn.click();
    }

    async getPromotionDetailsBreadcrumb(): Promise<string> {
        return (await this.promoTile.getAttribute('data-track-id')) || '';
    }

    async getPromoDetailsSlug(tile: Locator): Promise<string> {
        console.log(tile);
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
        return this.page.locator('ul.current-promos li').first().getByRole('link');
    }

    get promoTiles(): Locator {
        return this.page.locator('ul.current-promos li');
    }

    get featuredPromoBanner(): Locator {
        return this.page.locator('section.promo-banner');
    }

    get activePromosGrid(): Locator {
        throw new Error('not yet implemented on bingo in the same way');
    }

    get availablePromosGrid(): Locator {
        return this.page.locator('ul.current-promos');
    }

    get promoTimer(): Locator {
        throw new Error('not implemented on bingo');
    }

    get promoDetailsPage(): Locator {
        return this.page.locator('section.details');
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

    // Bingo specific
    get codeInputField(): Locator {
        return this.page.locator('[name="code"]');
    }

    get codeRejectedMsg(): Locator {
        return this.page.locator('.promo-code-message--rejected');
    }

    get redeemPromotionBtn(): Locator {
        return this.page.locator('button[data-qa="promocode-submit"]');
    }
}
