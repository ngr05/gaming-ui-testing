import { Page } from '@playwright/test';
import { join } from 'path';

import CookieBanner from '../components/cookieBanner.component';
import Sidebar from '../components/sidebar.component';
import { url } from '../product';

export default abstract class PageObject {
    readonly page: Page;

    readonly cookieBanner: CookieBanner;
    readonly sidebar: Sidebar;

    constructor(page: Page) {
        this.page = page;

        this.cookieBanner = new CookieBanner(page);
        this.sidebar = new Sidebar(page);
    }

    public async open(path: string) {
        await this.page.goto(join(url, path));
        try {
            await this.acceptCookies();
        } catch (e) {
            console.error('There was the following error with the cookie banner. Was it there?');
            console.error((e as Error).message);
        }
    }

    public async acceptCookies() {
        await this.cookieBanner.acceptAllBtn.click();
    }

    public async rejectCookies() {
        await this.cookieBanner.manageCookiesBtn.click();
        await this.cookieBanner.rejectAllBtn.click();
    }
}
