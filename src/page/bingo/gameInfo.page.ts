import { Locator } from '@playwright/test';

import GameInfo from '../gameInfo.page';

export default class BingoGameInfo extends GameInfo {
    /****************************************************************
     * Locators                                                     *
     ****************************************************************/
    get demoPlayBtn(): Locator {
        throw new Error('functionality not available on bingo!');
    }

    get realPlayBtn(): Locator {
        return this.page.locator('#gameInfoTop .gameLaunchButton span[data-qa="play-now"] button');
    }
}
