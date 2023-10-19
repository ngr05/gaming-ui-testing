import { Page } from '@playwright/test';

export default async (page: Page, message: string, file: string) => {
    if (!page.isClosed()) {
        const path = `test-results/debug/${file}-${new Date().getTime()}.png`;
        await page.screenshot({ fullPage: true, path });
        return console.debug(`${message}\n    See screenshot: ${path}`);
    }
    console.debug(message);
};
