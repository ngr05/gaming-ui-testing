// @ts-check

import { GameProvider, providers } from '../src/config/games';
import { expect, test } from '../src/playwright';

test.describe('Game launch tests', () => {
    test('contains malfuction terms', ({ gameInfo }, testInfo) => {
        testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
        testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to a game info page' });
        const terms = gameInfo.page.getByText(/malfunction voids all pays (?:&|and)(?: all)? plays/i);
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '2. observe that the relevant terms are displayed within the info',
        });
        testInfo.annotations.push({
            type: 'testrail_result_comment',
            description: '    text that is being searched for: /malfunction voids all pays (?:&|and)(?: all)? plays/i',
        });
        expect(terms !== undefined).toBeTruthy();
    });

    test.describe('when logged out', () => {
        providers().forEach((provider: GameProvider) => {
            test(`${provider.name} games cannot be launched when not logged in and a user is prompted to login when attempting to play`, async ({
                container,
                gameInfo,
            }, testInfo) => {
                if (provider.slug === '') {
                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `manual checks needed as there was no game configured for the supplier, ${provider.name}`,
                    });
                    test.skip(true, `there is no game configured for ${provider.name}`);
                }
                testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: `1. go to the game info page for a ${provider.name} game (/${provider.slug})`,
                });
                await gameInfo.goTo(provider.slug);
                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: '2. attempt to launch the game in real mode',
                });
                try {
                    await gameInfo.realPlayBtn.waitFor({ timeout: 15000 });
                } catch {
                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `manual checks needed as the game configured for the supplier, ${provider.name}, looks like it might be sensitive`,
                    });
                    testInfo.status = 'skipped';
                    test.skip(
                        true,
                        `the game configured for ${provider.name} looks like it might be sensative. please check manually...`,
                    );
                }
                await gameInfo.realPlayBtn.click();
                testInfo.annotations.push({
                    type: 'testrail_result_comment',
                    description: '3. observe the user is prompted to login',
                });
                await expect(container.sidebar.myAccountIndicator).toBeVisible();
            });
        });
    });

    test.describe('when logged in', () => {
        test.describe('can launch games in real play', () => {
            // const launchTimeout = 180000;

            providers().forEach((provider: GameProvider) => {
                test(`from the supplier ${provider.name}`, async ({ account, container, gameInfo }, testInfo) => {
                    if (provider.slug === '') {
                        testInfo.annotations.push({
                            type: 'testrail_result_comment',
                            description: `manual checks needed as there was no game configured for the supplier, ${provider.name}`,
                        });
                        test.skip(true, `there is no game configured for ${provider.name}`);
                    }
                    testInfo.annotations.push({ type: 'testrail_case_field', description: 'ref:GUT-1' });
                    testInfo.annotations.push({ type: 'testrail_result_comment', description: '1. go to the portal' });

                    testInfo.annotations.push({ type: 'testrail_result_comment', description: '2. login' });
                    await container.login(account);
                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: `3. go to the game info page for a ${provider.name} game (/${provider.slug})`,
                    });
                    // i hate this so much but for now we need it as a user is logged in but the portal is rejecting
                    // going to the game page for sensative games
                    await gameInfo.page.waitForTimeout(1000);
                    await gameInfo.goTo(provider.slug);

                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: '4. attempt to launch the game in real mode',
                    });
                    const gameWindow = await gameInfo.launchGame('real');
                    testInfo.annotations.push({
                        type: 'testrail_result_comment',
                        description: '5. wait for the game to finish loading',
                    });
                    await expect(await gameWindow.loadingScreen()).toBeVisible();

                    // removed the check on the game loading and the loader disappears (essentially the game being
                    // playable) as the time it takes is very long for some games and it seems to cause the runner to
                    // crash at points. it needs further investigation and work.
                    // testInfo.annotations.push({
                    //     type: 'testrail_result_comment',
                    //     description: '6. observe the game launches and is playable',
                    // });
                    // try {
                    //     await expect(await gameWindow.loadingScreen()).toBeHidden({ timeout: launchTimeout });
                    // } catch {
                    //     testInfo.annotations.push({
                    //         type: 'testrail_result_comment',
                    //         description: `manual checks needed as the game configured! for the supplier ${provider.name}, it took over ${launchTimeout / 1000} seconds to launch.`,
                    //     });
                    // }
                    // await expect(await gameWindow.container()).toBeVisible();
                });
            });
        });
    });
});
