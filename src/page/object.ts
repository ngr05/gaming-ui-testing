import { Page } from '@playwright/test';
import { join } from 'path';

import CookieBanner from '../components/cookieBanner.component';
import Sidebar from '../components/sidebar.component';
import { url } from '../utils/product';
import { Cookie } from '../config/cookies';

export default abstract class PageObject {
    readonly page: Page;

    readonly cookieBanner: CookieBanner;
    readonly sidebar: Sidebar;

    // private cookiesDismissed = false;

    constructor(page: Page) {
        this.page = page;

        this.cookieBanner = new CookieBanner(page);
        this.sidebar = new Sidebar(page);
    }

    public async addCookie(cookie: Cookie): Promise<void> {
        const currentCookies = await this.page.context().cookies(url);
        await this.page.context().addCookies([...currentCookies, cookie]);
        await this.page.reload();
    }

    public async goTo(path: string): Promise<void> {
        console.debug(`going to ${join(url, path)}`);
        await this.page.goto(join(url, path), { waitUntil: 'load' });
        this.cookieBanner.dismissIfVisible().catch((err) => console.error(err));
        // await this.cookieBanner.dismissIfVisible();
        // try {
        //     if (!this.cookiesDismissed) {
        //         await this.cookieBanner.banner.waitFor({ timeout: 3000 });
        //         await this.cookieBanner.acceptCookies();
        //         this.cookiesDismissed = true;
        //     }
        // } catch (e) {
        //     if (await this.geoBlockedHeader.isVisible()) {
        //         throw new Error('site geo blocked!');
        //     }
        //     const path = `test-results/cookie-banner-error-${new Date().getTime()}.png`;
        //     await this.page.screenshot({ path });
        //     console.error(
        //         `There was the following error with the cookie banner. Was it there?\n    See screenshot ${path}`,
        //     );
        //     console.error((e as Error).message);
        // }
    }

    /****************************************************************
     * Locators                                                     *
     * These need to be dfined on a product by product basis.       *
     ****************************************************************/
    // get geoBlockedHeader(): Locator {
    //     return this.page.getByRole('heading', {
    //         name: "WE'RE UNAVAILABLE IN YOUR LOCATION",
    //     });
    // }
}
