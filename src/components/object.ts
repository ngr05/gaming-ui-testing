import { Page } from '@playwright/test';

export default abstract class ComponentObject {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
