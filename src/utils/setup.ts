import { Page } from '@playwright/test';
import PageObject from '../page/object';

export default class Setup extends PageObject {
    constructor(page: Page) {
        super(page);
    }
}
