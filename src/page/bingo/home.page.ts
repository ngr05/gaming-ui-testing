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
     ****************************************************************/
    get joinBtn(): Locator {
        return this.page.locator('a[data-qa="account-join-now"]');
    }

    get playBingoBtn(): Locator {
        return this.page.locator('[data-qa="room-bingo-lobby"]');
    }

    get promotionsBtn(): Locator {
        return this.page.locator('a[data-qa="nav-main-promotions"]');
    }

    get saferGamblingBtn(): Locator {
        throw new Error('no safer gambling button');
    }
}
