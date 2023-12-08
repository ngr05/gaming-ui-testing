import { Locator } from '@playwright/test';

import GameInfo from '../gameInfo.page';

export default class VegasGameInfo extends GameInfo {
    /****************************************************************
     * Locators                                                     *
     ****************************************************************/
    get demoPlayBtn(): Locator {
        return this.page.locator('button[data-qa="launch-free-play"]');
    }

    get realPlayBtn(): Locator {
        return this.page.locator('button[data-qa="launch-real-play"]');
    }
}
