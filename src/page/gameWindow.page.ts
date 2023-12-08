import { Locator, Page } from '@playwright/test';

import PageObject from './object';

export default class GameWindow extends PageObject {
    private glsGameWindow: Locator;
    private glsLoadingScreen: Locator;

    private vfGameWindow: Locator;
    private vfLoadingScreen: Locator;

    constructor(page: Page) {
        super(page);

        this.glsGameWindow = this.page.locator('.GLS-inGameInterface [data-qa="game"]');
        this.glsLoadingScreen = this.page.locator('.GLS-loadingScreen');

        // this.vfGameWindow = this.page.locator('.minigameContainer');
        this.vfGameWindow = this.page.locator('#appWrapper');
        this.vfLoadingScreen = this.page.locator('#universalLoadingContainer');
    }

    async container(): Promise<Locator> {
        await Promise.any([this.glsGameWindow.waitFor(), this.vfGameWindow.waitFor()]);
        if (await this.vfGameWindow.isVisible()) {
            // taking into account the bingo game window with VF games
            return this.vfGameWindow;
        }
        return this.glsGameWindow;
    }

    async loadingScreen(): Promise<Locator> {
        await Promise.any([this.glsLoadingScreen.waitFor(), this.vfLoadingScreen.waitFor()]);
        if (await this.vfLoadingScreen.isVisible()) {
            // taking into account the bingo game window with VF games
            return this.vfLoadingScreen;
        }
        return this.glsLoadingScreen;
    }

    /****************************************************************
     * Locators                                                     *
     ****************************************************************/
}
