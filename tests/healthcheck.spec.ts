// @ts-check

import { expect, test } from '../src/playwright';
import { title } from '../src/product';

test('has title', async ({ homepage }) => {
    // Expect a title "to contain" a substring.
    await expect(homepage.page).toHaveTitle(new RegExp(title));
});
