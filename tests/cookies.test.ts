// @ts-check

import { expect, test } from '../src/playwright';
import { getHomePage } from '../src/utils/factory';
import { url } from '../src/utils/product';

test.describe('cookies testing', () => {
    test.describe.skip('google analytics', () => {
        const tests: { key: string; name: string }[] = [
            { key: 'CE-btag', name: 'btag' },
            { key: 'CT-mi_ign', name: 'mi_ign' },
            { key: 'CT-mi_u', name: 'mi_u' },
            { key: 'CF-promo_code', name: 'promo_code' },
            { key: 'CE-rfr', name: 'aff/rfr' },
            { key: 'CE-sub_id', name: 'sub_id' },
        ];

        tests.forEach((tc: { key: string; name: string }) => {
            test(`check for ${tc.name} cookie when cookies are accepted`, async ({ page }, testInfo) => {
                testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
                testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
                await page.goto(url, { waitUntil: 'load' });
                const homepage = getHomePage(page);

                testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. accept cookies' });
                await homepage.cookieBanner.waitToBeVisible();
                await homepage.cookieBanner.acceptCookies();

                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: '3. inspect the cookies set on the domain',
                });
                const cookies = await homepage.page.context().cookies();
                const cookie = cookies.find((c) => c.name === tc.name);

                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: `4. ensure there is a cookie with the name ${tc.name} set`,
                });
                if (!cookie) {
                    throw new Error(`cannot find the ${tc.name} cookie`);
                }
                expect(cookie.value).not.toBeNull();
            });

            test(`check for ${tc.name} cookie when cookies are NOT accepted`, async ({ page }, testInfo) => {
                testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
                testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
                await page.goto(url, { waitUntil: 'load' });

                testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. reject cookies' });
                const homepage = getHomePage(page);
                await homepage.cookieBanner.waitToBeVisible();
                await homepage.cookieBanner.rejectCookies();

                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: '3. inspect the cookies set on the domain',
                });
                const cookies = await page.context().cookies();
                const cookie = cookies.find((c) => c.name === tc.name);
                const esential = /^CE-.+/.test(tc.key);

                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: `4. ensure there is a cookie with the name ${tc.name} set`,
                });
                if (esential) {
                    expect(cookie).not.toBeNull();
                    expect(cookie).not.toBeUndefined();
                    expect(cookie?.value).not.toBeNull();
                    expect(cookie?.value).not.toBeUndefined();
                    return;
                }
                expect(cookie).toBeUndefined();
            });
        });
    });
});
