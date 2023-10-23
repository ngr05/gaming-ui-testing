import { Locator } from '@playwright/test';

import PageObject from './object';

export default abstract class Homepage extends PageObject {
    public async goTo(): Promise<void> {
        return await super.goTo('');
    }

    public async navigateToPromotions(): Promise<PageObject> {
        await this.promotionsBtn.waitFor();
        await this.promotionsBtn.click();
        return this.getPromoPageObject();
    }

    protected abstract getPromoPageObject(): PageObject;

    /****************************************************************
     * Locators                                                     *
     * The locators here are either the most constent or from Vegas *
     ****************************************************************/
    abstract get joinBtn(): Locator;
    abstract get promotionsBtn(): Locator;
    abstract get saferGamblingBtn(): Locator;
}
