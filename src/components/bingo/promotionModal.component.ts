import { Locator } from '@playwright/test';

import ComponentObject from '../object';
import debug from '../../utils/debug';

export default class PromotionModal extends ComponentObject {
    /**
     * The number of seconds that it should be waited to check if the promo modal appears.
     * @type {number}
     */
    readonly timeout: number = 10;

    public async dismissIfDisplayed() {
        try {
            await this.dismissPromoModal.waitFor({ timeout: this.timeout * 1000 });
            await this.dismissPromoModal.click();
        } catch (e) {
            await debug(
                this.page,
                `There was an error with the bingo promo modal. Was it there?\n    ${(e as Error).message}`,
                'bingo-promo-modal-error',
            );
        }
    }

    /********************************************
     * Locators                                 *
     ********************************************/
    get dismissPromoModal(): Locator {
        return this.page.locator('a[data-qa="promotion-modal-close"]');
    }

    get promoModal(): Locator {
        return this.page.locator('#promotion-modal');
        // class="modal modal--visible"
        // id="promotion-modal"
    }
}
