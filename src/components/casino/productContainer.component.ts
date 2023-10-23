import { Locator, Page } from '@playwright/test';

import ProductContainer from '../productContainer.component';
import { Customer } from '../../utils/customer';
import DepositPrompt from './depositPrompt.component';

export default class CasinoContainer extends ProductContainer {
    readonly depositPrompt: DepositPrompt;

    constructor(page: Page) {
        super(page);
        this.depositPrompt = new DepositPrompt(page);
    }

    public async login(account: Customer) {
        console.log('CASINO LOGIN!');
        await super.login(account);
        await this.depositPrompt.dismissIfDisplayed();
    }

    /********************************************
     * Locators                                 *
     ********************************************/
    get breadcrumbs(): Locator {
        return this.page.locator('ul[data-testid="breadcrumb"]');
    }

    get myAccountBtn(): Locator {
        return this.page.locator('span[data-qa="account-open"]');
    }
}
