import { test as base } from '@playwright/test';

import Setup from './utils/setup';

import Homepage from './page/home.page';
import BingoHomepage from './page/bingo/home.page';
import CasinoHomepage from './page/casino/home.page';
import VegasHomepage from './page/vegas/home.page';

export { expect } from '@playwright/test';

interface CustomFixtures {
    setup: Setup;
    homepage: Homepage;
}

export const test = base.extend<CustomFixtures>({
    setup: async ({ page }, use) => {
        const setup = new Setup(page);
        await use(setup);
    },

    homepage: async ({ page }, use) => {
        switch (process.env.PRODUCT) {
            case 'bingo':
                return await use(new BingoHomepage(page));
            case 'casino':
                return await use(new CasinoHomepage(page));
            case 'vegas':
                return await use(new VegasHomepage(page));
            default:
                throw new Error('cannot work out the right home page instance!');
        }
    },
});
