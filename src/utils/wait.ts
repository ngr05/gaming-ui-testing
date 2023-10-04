import { Locator } from '@playwright/test';

export const elementToBeVisible = async (element: Locator, seconds = 3): Promise<void> => {
    if (seconds <= 0) {
        throw new Error('element not visible in the time alotted');
    }

    if (await element.isVisible()) {
        return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await elementToBeVisible(element, --seconds);
};

export const buttonAndClick = async (element: Locator) => {
    await elementToBeVisible(element);
    await element.click();
};
