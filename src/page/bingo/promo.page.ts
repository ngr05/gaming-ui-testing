import { Locator } from '@playwright/test';

import Promotions from '../promotions.page';

export default class BingoPromotions extends Promotions {
    public async redeemPromotion(code: string): Promise<void> {
        await this.codeInputField.waitFor();
        await this.codeInputField.fill(code);
        await this.redeemPromotionBtn.click();
    }

    /********************************************
     * Locators                                 *
     ********************************************/
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
