import { test } from './playwright';

export let product: string;
export let title: string;

const { ENVIRONMENT, PRODUCT } = process.env;
let validEnvs = ['test2', 'staging', 'live'];

switch (PRODUCT) {
    case 'bingo':
        product = 'skybingo';
        title = 'Sky Bingo';
        break;

    case 'casino':
        product = 'skycasino';
        title = 'Sky Casino';
        validEnvs = ['next', 'live'];
        break;

    case 'vegas':
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

export const skipOnBingo = (reason: string) => {
    test.skip(process.env.PRODUCT === 'bingo', reason);
};
