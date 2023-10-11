import { Locator } from '@playwright/test';

import { expect } from '../playwright';
import PageObject from './object';

export default abstract class Promotions extends PageObject {
    readonly exclusivePromoHeading = 'Exclusively for you';

    public async goTo(): Promise<void> {
        return await super.goTo('promotions');
    }

    public async selectCardAndVerify(card: Locator): Promise<void> {
        await card.waitFor();
        const slug = await this.cardLinks.first().getAttribute('href');
        const tag = await this.cardLinks.first().getAttribute('data-qa');
        if (!tag) {
            throw new Error('could not find a card!');
        }

        await this.selectPromoCard(tag);
        expect(this.page.url()).toMatch(new RegExp(`.+${slug}?$`));
    }

    public async selectPromoCard(tag: string): Promise<void> {
        const selector = `a[data-qa="${tag}"]`;
        const card: Locator = this.page.locator(selector);
        await card.waitFor();
        await card.click();
        await this.pdpLoadedIndicator.waitFor();
    }

    /****************************************************************
     * Locators                                                     *
     * The locators here are either the most constent or from Vegas *
     ****************************************************************/
    get cardLinks(): Locator {
        return this.page.locator('a[data-qa^="pr-card-link-"]');
    }

    get exclusivePromoHeader(): Locator {
        return this.page.getByRole('heading', { name: this.exclusivePromoHeading });
    }

    get exclusivePromoLink(): Locator {
        return this.page.locator('[data-qa="promotion-row-exclusive"]');
    }

    get latestPromosRow(): Locator {
        return this.page.locator('[data-qa^="promotion-row-latest-promotions"]');
    }

    get latestPromoLinks(): Locator {
        return this.page.locator('[data-qa^="promo-card-link-latest-promotions-"]');
    }

    get pdpLoadedIndicator(): Locator {
        return this.page.locator('div[data-track^="PDP"]');
    }
}
