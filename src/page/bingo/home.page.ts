import { Locator } from '@playwright/test';

import PageObject from '../object';

import Homepage from '../home.page';
import BingoPromotions from './promo.page';

export default class BingoHomepage extends Homepage {
    public async navigateToPlayBingo(): Promise<void> {
        const newPagePromise = this.page.context().waitForEvent('page');

        await this.playBingoBtn.waitFor();
        await this.playBingoBtn.click();

        const bingoLobby = await newPagePromise;
        await bingoLobby.waitForLoadState();
        await bingoLobby.locator('div#lobbyContent').waitFor();
    }

    protected getPromoPageObject(): PageObject {
        return new BingoPromotions(this.page);
    }

    /****************************************************************
     * Locators                                                     *
     * The locators here are either the most constent or from Vegas *
     ****************************************************************/
    get playBingoBtn(): Locator {
        return this.page.locator('[data-qa="room-bingo-lobby"]');
    }

    get promotionsBtn(): Locator {
        return this.page.locator('a[data-qa="nav-main-promotions"]');
    }
}
