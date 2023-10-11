import { Page } from '@playwright/test';
import { join } from 'path';

import CookieBanner from '../components/cookieBanner.component';
import Sidebar from '../components/sidebar.component';
import { url } from '../product';
import { Cookie } from '../config/cookies';

export default abstract class PageObject {
    readonly page: Page;

    readonly cookieBanner: CookieBanner;
    readonly sidebar: Sidebar;

    private cookiesDismissed = false;

    constructor(page: Page) {
        this.page = page;

        this.cookieBanner = new CookieBanner(page);
        this.sidebar = new Sidebar(page);
    }

    public async addCookie(cookie: Cookie): Promise<void> {
        await this.page.context().addCookies([...(await this.page.context().cookies(url)), cookie]);
        await this.page.reload();
    }

    public async goTo(path: string): Promise<void> {
        await this.page.goto(join(url, path));
        try {
            if (!this.cookiesDismissed) {
                await this.cookieBanner.banner.waitFor({ timeout: 3000 });
                await this.cookieBanner.acceptCookies();
                this.cookiesDismissed = true;
            }
        } catch (e) {
            console.error('There was the following error with the cookie banner. Was it there?');
            console.error((e as Error).message);
        }
    }

    /****************************************************************
     * Locators                                                     *
     * These need to be dfined on a product by product basis.       *
     ****************************************************************/
}
