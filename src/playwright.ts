import { test as base } from '@playwright/test';

import Setup from './utils/setup';
import Homepage from './page/home.page';

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
        await use(new Homepage(page));
    },
});
