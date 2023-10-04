import { expect } from '@playwright/test';

import { test } from '../src/playwright';
import { title } from '../src/product';

test('has title', async ({ homepage }) => {
    await homepage.open();

    // Expect a title "to contain" a substring.
    await expect(homepage.page).toHaveTitle(new RegExp(title));
});
