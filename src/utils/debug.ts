import { Page } from '@playwright/test';

export default async (page: Page, message: string) => {
    console.debug(message);
    await page.screenshot({
        path: `test-results/debug/${new Date().getTime()}-${message.toLowerCase().replace(/[\W_]+/g, '-')}.png`,
    });
};
