import { url } from '../utils/product';

export interface Cookie {
    name: string;
    url: string;
    value: string;
}

export const debug = {
    name: 'Sky_Debug',
    url,
    value: '1',
};
export const dismissOneTrust = {
    name: 'OptanonAlertBoxClosed',
    url,
    value: 'ui-tests',
};
export const enableDebugActions = {
    name: 'ENABLE_UI_TEST_DEBUG_ACTIONS',
    url,
    value: '1',
};
export const excludeExperiments = {
    name: 'SKY_SWITCH',
    url,
    value: 'excludeExperiments',
};
export const newPromotionsListPage = {
    name: 'skyvegas-CF-NEXTVEGASPROMOS-01',
    url,
    value: '1',
};

export const getCookieObject = (name: string, value: string): Cookie => {
    return { name, url, value };
};
