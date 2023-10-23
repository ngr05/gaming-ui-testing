import { Locator } from '@playwright/test';

import debug from '../../utils/debug';
import ComponentObject from '../object';

export default class DepositPrompt extends ComponentObject {
    /**
     * The number of seconds that it should be waited to check if the deposit prompt modal appears.
     * @type {number}
     */
    readonly timeout: number = 3;

    public async dismissIfDisplayed() {
        try {
            await this.depositPromptModal.waitFor({ timeout: this.timeout * 1000 });
            await this.dismissDepositPromptBtn.click();
            await this.depositPromptModal.waitFor({ state: 'hidden' });
        } catch (e) {
            await debug(
                this.page,
                `There was an error with the casino deposit modal. Was it there?\n    ${(e as Error).message}`,
                'casino-deposit-modal-error',
            );
        }
    }

    /********************************************
     * Locators                                 *
     ********************************************/
    get dismissDepositPromptBtn(): Locator {
        return this.depositPromptModal.getByRole('button', { name: 'Cancel icon' });
    }

    get depositPromptModal(): Locator {
        return this.page.locator('div[data-track="Deposit Prompt"]');
    }
}
