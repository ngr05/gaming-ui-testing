// @ts-check

import { expect, test } from '../../src/playwright';

test.describe('Sky Vegas promotion tests', () => {
    test('Test that as a guest clicking on a PLP Exclusively for you card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Vegas promotions page',
        });
        const hasExclusivePromo = await promoPage.exclusivePromoLink.isVisible();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. select an exclusive promo if there is one',
        });
        if (hasExclusivePromo) {
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '3. select the promotion card' });
            await promoPage.exclusivePromoLink.waitFor();
            const slug = await promoPage.getPromoDetailsSlug(promoPage.exclusivePromoLink);
            await promoPage.exclusivePromoLink.click();

            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '4. observe the relevant promotion details page is opened',
            });
            await promoPage.promoDetailsPage.waitFor();
            expect(promoPage.page.url()).toMatch(new RegExp(`.+${slug}?$`));
        }
    });

    test('Test that as a guest clicking on a PLP latest promotions card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
        promoPage,
    }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '1. go to the Sky Vegas promotions page',
        });
        const hasLatestPromo = await promoPage.latestPromosContainer.isVisible();

        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. select the latest promo if there is one',
        });
        if (hasLatestPromo) {
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '3. select the promotion card' });
            await promoPage.latestPromoLinks.first().waitFor();
            const slug = await promoPage.getPromoDetailsSlug(promoPage.exclusivePromoLink);
            await promoPage.latestPromoLinks.first().click();

            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '4. observe the relevant promotion details page is opened',
            });
            await promoPage.promoDetailsPage.waitFor();
            expect(promoPage.page.url()).toMatch(new RegExp(`.+${slug}?$`));
        }
    });

    test.describe('when logged in', () => {
        test('a customer clicking on a PLP Exclusively for you card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
            account,
            container,
            promoPage,
        }, testInfo) => {
            testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '1. go to the Sky Vegas promotions page',
            });
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
            await container.login(account);
            const hasExclusivePromo = await promoPage.exclusivePromoLink.isVisible();

            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '3. select an exclusive promo if there is one',
            });
            if (hasExclusivePromo) {
                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: '4. select the promotion card',
                });
                await promoPage.exclusivePromoLink.waitFor();
                const slug = await promoPage.getPromoDetailsSlug(promoPage.exclusivePromoLink);
                await promoPage.exclusivePromoLink.click();

                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: '5. observe the relevant promotion details page is opened',
                });
                await promoPage.promoDetailsPage.waitFor();
                expect(promoPage.page.url()).toMatch(new RegExp(`.+${slug}?$`));
            }
        });

        test('a customer on a PLP latest promotions card will go to PDP @test @staging @live @mobile @tablet @desktop', async ({
            account,
            container,
            promoPage,
        }, testInfo) => {
            testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '1. go to the Sky Vegas promotions page',
            });
            testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. log in' });
            await container.login(account);
            const hasLatestPromo = await promoPage.latestPromosContainer.isVisible();

            testInfo.annotations.push({
                type: 'testrail_result_comment',
                description: '3. select the latest promo if there is one',
            });
            if (hasLatestPromo) {
                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: '4. select the promotion card',
                });
                await promoPage.latestPromoLinks.first().waitFor();
                const slug = await promoPage.getPromoDetailsSlug(promoPage.exclusivePromoLink);
                await promoPage.latestPromoLinks.first().click();

                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: '5. observe the relevant promotion details page is opened',
                });
                await promoPage.promoDetailsPage.waitFor();
                expect(promoPage.page.url()).toMatch(new RegExp(`.+${slug}?$`));
            }
        });
    });
});
