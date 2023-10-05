import { Locator } from '@playwright/test';
import Homepage from '../home.page';

export default class VegasHomepage extends Homepage {
    /********************************************
     * Locators                                 *
     ********************************************/
    get balanceDisplay(): Locator {
        return this.page.locator('p[data-qa="user-balance"]');
    }
}
