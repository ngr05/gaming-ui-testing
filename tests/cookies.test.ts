// @ts-check

import { expect, test } from '../src/playwright';
import { getHomePage } from '../src/utils/factory';
import { url } from '../src/utils/product';

interface CookieTestCase {
    key: string;
    name: string;
    title: string;
}

const gaCookiesTests: CookieTestCase[] = [
    { key: 'btag', name: 'CE-btag', title: 'btag' },
    { key: 'mi_ign', name: 'CT-mi_ign', title: 'mi_ign' },
    { key: 'mi_u', name: 'CT-mi_u', title: 'mi_u' },
    { key: 'sba_promo', name: 'CE-promo_code', title: 'promo_code' },
    { key: 'aff', name: 'CE-rfr', title: 'aff/rfr' },
    { key: 'offer', name: 'CE-sub_id', title: 'offer' },
];
const value = 'testing';

test.describe('@cookies testing', () => {
    test.describe('when cookies are approved', () => {
        test.describe('@google analytics', () => {
            gaCookiesTests.forEach((tc: CookieTestCase) => {
                test(`check for ${tc.title} cookie when cookies are accepted`, async ({ page }, testInfo) => {
                    testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
                    testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
                    await page.goto(url, { waitUntil: 'load' });
                    const homepage = getHomePage(page);

                    testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. accept cookies' });
                    await homepage.cookieBanner.waitToBeVisible();
                    await homepage.cookieBanner.acceptCookies();

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `3. set to the cookies through a query string (${url}?${tc.key}=${value})`,
                    });
                    await homepage.page.goto(`${url}?${tc.key}=${value}`, { waitUntil: 'load' });

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: '4. inspect the cookies set on the domain',
                    });
                    const cookies = await homepage.page.context().cookies();
                    const cookie = cookies.find((c) => c.name === tc.name);

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `5. ensure there is a cookie with the name ${tc.name} set`,
                    });
                    if (!cookie) {
                        throw new Error(`cannot find the ${tc.name} cookie`);
                    }
                    expect(cookie.value).toBe(value);
                    // check they last 45 days (not implemented yet)
                });
            });
        });
    });

    test.describe('when only necessary cookes are approved', () => {
        test.describe('google analytics', () => {
            gaCookiesTests.forEach((tc: CookieTestCase) => {
                test(`check for ${tc.title} cookie when cookies are NOT accepted`, async ({ page }, testInfo) => {
                    testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
                    testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
                    await page.goto(url, { waitUntil: 'load' });

                    testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. reject cookies' });
                    const homepage = getHomePage(page);
                    await homepage.cookieBanner.waitToBeVisible();
                    await homepage.cookieBanner.rejectCookies();

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `3. set to the cookies through a query string (${url}?${tc.key}=${value})`,
                    });
                    await homepage.page.goto(`${url}?${tc.key}=${value}`, { waitUntil: 'load' });

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: '4. inspect the cookies set on the domain',
                    });
                    const cookies = await page.context().cookies();
                    const cookie = cookies.find((c) => c.name === tc.name);
                    const esential = /^C[EF]-.+/.test(tc.name);

                    if (esential) {
                        testInfo.annotations.push({
                            type: 'testrail_result_comment',
                            description: `5. ensure there is a cookie with the name ${tc.name} set`,
                        });
                        expect(cookie).not.toBeNull();
                        expect(cookie).not.toBeUndefined();
                        expect(cookie?.value).toBe(value);
                        return;
                    }
                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `5. ensure there is not a cookie with the name ${tc.name} set`,
                    });
                    expect(cookie).toBeUndefined();
                });
            });
        });
    });

    test.describe('when 3rd party cookies are disabled', () => {
        test.describe('google analytics', () => {
            gaCookiesTests.forEach((tc: CookieTestCase) => {
                if (!/^CT-.+/.test(tc.name)) {
                    return;
                }

                test(`removes the ${tc.title} cookie when 3rd party cookies are disabled`, async ({
                    page,
                }, testInfo) => {
                    testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
                    testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });
                    await page.goto(url, { waitUntil: 'load' });
                    const homepage = getHomePage(page);

                    testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. accept cookies' });
                    await homepage.cookieBanner.waitToBeVisible();
                    await homepage.cookieBanner.acceptCookies();

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `3. set to the cookies through a query string (${url}?${tc.key}=${value})`,
                    });
                    await homepage.page.goto(`${url}?${tc.key}=${value}`, { waitUntil: 'load' });

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `4. inspect the cookies set on the domain and ensure there is a cookie with the name ${tc.name} set`,
                    });
                    let cookies = await homepage.page.context().cookies();
                    let cookie = cookies.find((c) => c.name === tc.name);
                    if (!cookie) {
                        throw new Error(`cannot find the ${tc.name} cookie`);
                    }
                    expect(cookie.value).toBe(value);

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `5. disable 3rd party cookies`,
                    });
                    await homepage.cookieBanner.disbleThirdPartyCookies();

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: '6. look for the cookie set on the domain',
                    });
                    cookies = await homepage.page.context().cookies();
                    cookie = cookies.find((c) => c.name === tc.name);

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `7. ensure there is no cookie with the name ${tc.name} set`,
                    });
                    expect(cookie).toBeUndefined();
                });
            });
        });
    });
});
