import { Locator, Page } from '@playwright/test';

import { Customer } from '../../utils/customer';
import ProductContainer from '../productContainer.component';
import PromotionModal from './promotionModal.component';

export default class BingoContainer extends ProductContainer {
    readonly promoModal: PromotionModal;

    constructor(page: Page) {
        super(page);

        this.promoModal = new PromotionModal(page);
    }

    public async login(account: Customer) {
        await super.login(account);
        this.promoModal.dismissIfDisplayed().catch((err) => console.error(err));
    }

    /********************************************
     * Locators                                 *
     ********************************************/
    get balanceDisplay(): Locator {
        return this.page.locator('span[data-qa="account-balance"]');
    }

    get loginBtn(): Locator {
        return this.page.locator('a[data-qa="account-log-in"]');
    }

    get myAccountBtn(): Locator {
        return this.page.locator('a[data-qa="account-view-account"]');
    }
}
