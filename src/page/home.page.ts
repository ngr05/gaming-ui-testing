import PageObject from './object';

export default class Homepage extends PageObject {
    public async goTo(): Promise<void> {
        return await super.goTo('');
    }

    /****************************************************************
     * Locators                                                     *
     * The locators here are either the most constent or from Vegas *
     ****************************************************************/
}
