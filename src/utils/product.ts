import { TestInfo } from 'playwright/test';
import { test } from '../playwright';

export let product: string;
export let title: string;

export enum Product {
    BINGO = 'bingo',
    CASINO = 'casino',
    VEGAS = 'vegas',
}

const { ENVIRONMENT, PRODUCT } = process.env;
let validEnvs = ['test2', 'staging', 'live'];

switch (PRODUCT) {
    case Product.BINGO:
        product = 'skybingo';
        title = 'Sky Bingo';
        break;

    case Product.CASINO:
        product = 'skycasino';
        title = 'Sky Casino';
        validEnvs = ['next', 'live'];
        break;

    case Product.VEGAS:
        product = 'skyvegas';
        title = 'Sky Vegas';
        break;

    default:
        throw new Error('please specify a valid product under test! (bingo, casino or vegas)');
}

if (!ENVIRONMENT || !validEnvs.includes(ENVIRONMENT)) {
    throw new Error(`please specify a valid environment to run the tests on! (${validEnvs.join(', ')})`);
}

export const url = `https://www.${ENVIRONMENT !== 'live' ? `${ENVIRONMENT}.` : ''}${product}.com/`;

export const skipOn = (product: Product | Product[], reason: string, testInfo: TestInfo) => {
    testInfo.annotations.push({
        type: 'testrail_result_comment',
        description: `skipping test on ${process.env.PRODUCT}; ${reason}`,
    });
    if (!Array.isArray(product)) {
        product = [product];
    }
    test.skip(product.includes(process.env.PRODUCT as Product), reason);
};
