import { Locator } from '@playwright/test';
import { join } from 'path';

import PageObject from './object';
import GameWindow from './gameWindow.page';
import { getRandomGame } from '../config/games';

export default abstract class GameInfo extends PageObject {
    protected slug = 'game';

    public async goTo(slug?: string): Promise<void> {
        const randomGame = getRandomGame();
        if (!slug && (!randomGame || randomGame.slug === '')) {
            throw new Error('no games configured for testing!');
        }
        const gameSlug = slug || randomGame.slug;
        await super.goTo(join(this.slug, gameSlug));
        await this.page.waitForLoadState();
    }

    public async launchGame(mode: 'demo' | 'real' = 'real'): Promise<GameWindow> {
        const btn = this[`${mode}PlayBtn`];
        const newPagePromise = this.page.context().waitForEvent('page');

        await btn.waitFor();
        await btn.click();

        const popup = await newPagePromise;
        const gameWindow = new GameWindow(popup);
        // this timeout is far too long but there are times where the page takes that long to load
        await gameWindow.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
        const container = await gameWindow.container();
        await container.waitFor();

        return gameWindow;
    }

    /****************************************************************
     * Locators                                                     *
     * The locators here are either the most constent or from Vegas *
     ****************************************************************/
    public abstract get demoPlayBtn(): Locator;
    public abstract get realPlayBtn(): Locator;
}
