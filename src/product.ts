export let product: string;
export let title: string;

switch (process.env.PRODUCT) {
    case 'bingo':
        product = 'skybingo';
        title = 'Sky Bingo';
        break;

    case 'casino':
        product = 'skycasino';
        title = 'Sky Casino';
        break;

    case 'vegas':
        product = 'skyvegas';
        title = 'Sky Vegas';
        break;

    default:
        throw new Error('please specify a valid product under test');
}

export const url = `https://www.${
    process.env.ENVIRONMENT !== 'live' ? `${process.env.ENVIRONMENT}.` : ''
}${product}.com/`;
