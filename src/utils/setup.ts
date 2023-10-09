import { Page } from '@playwright/test';

import PageObject from '../page/object';
import { Cookie, debug, dismissOneTrust, excludeExperiments } from '../config/cookies';

export default class Setup extends PageObject {
    readonly defaultCookies: Cookie[] = [debug, dismissOneTrust, excludeExperiments];

    // Class methods
    constructor(page: Page) {
        super(page);
    }

    public async setDefaultCookies(): Promise<void> {
        await this.page.context().addCookies(this.defaultCookies);
    }
}
