// @ts-check

import { expect, test } from '../src/playwright';
import { title } from '../src/product';

test('has title', async ({ homepage }, testInfo) => {
    // Expect a title "to contain" a substring.
    testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
    testInfo.annotations.push({
        type: 'testrail_result_comment',
        description: '2. check the page title contains the product name',
    });
    await expect(homepage.page).toHaveTitle(new RegExp(title));
});
