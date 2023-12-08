import { Locator } from '@playwright/test';

import GameInfo from '../gameInfo.page';
import GameWindow from '../gameWindow.page';

export default class CasinoGameInfo extends GameInfo {
    protected slug = 'game-info';

    public async launchGame(mode: 'demo' | 'real' = 'real'): Promise<GameWindow> {
        const btn = this[`${mode}PlayBtn`];

        await btn.waitFor();
        await btn.click();

        const gameWindow = new GameWindow(this.page);
        await gameWindow.page.waitForLoadState('load', { timeout: 10000 });
        const container = await gameWindow.container();
        await container.waitFor();

        return gameWindow;
    }

    /****************************************************************
     * Locators                                                     *
     ****************************************************************/
    get demoPlayBtn(): Locator {
        throw new Error('functionality not available on casino!');
    }

    get realPlayBtn(): Locator {
        return this.page.locator('button[data-qa="play-button"]');
    }
}
