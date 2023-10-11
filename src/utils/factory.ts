import { Page } from '@playwright/test';

import ProductContainer from '../components/productContainer.component';

import Promotions from '../page/promotions.page';

import BingoProductContainer from '../components/bingo/productContainer.component';
import CasinoProductContainer from '../components/casino/productContainer.component';
import VegasProductContainer from '../components/vegas/productContainer.component';

import BingoPromotions from '../page/bingo/promo.page';
import CasinoPromotions from '../page/casino/promo.page';
import VegasPromotions from '../page/vegas/promo.page';

export const getProductContainer = (page: Page): ProductContainer => {
    switch (process.env.PRODUCT) {
        case 'bingo':
            return new BingoProductContainer(page);
        case 'casino':
            return new CasinoProductContainer(page);
        case 'vegas':
            return new VegasProductContainer(page);
        default:
            throw new Error('cannot work out the right home page instance!');
    }
};

export const getPromotionsPage = (page: Page): Promotions => {
    switch (process.env.PRODUCT) {
        case 'bingo':
            return new BingoPromotions(page);
        case 'casino':
            return new CasinoPromotions(page);
        case 'vegas':
            return new VegasPromotions(page);
        default:
            throw new Error('cannot work out the right home page instance!');
    }
};
