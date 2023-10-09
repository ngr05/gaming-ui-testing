import { Page } from '@playwright/test';

import Homepage from './home.page';
import Promotions from './promotions.page';

import BingoHomepage from './bingo/home.page';
import CasinoHomepage from './casino/home.page';
import VegasHomepage from './vegas/home.page';

import BingoPromotions from './bingo/promo.page';
import CasinoPromotions from './casino/promo.page';
import VegasPromotions from './vegas/promo.page';

export const getHomepage = (page: Page): Homepage => {
    switch (process.env.PRODUCT) {
        case 'bingo':
            return new BingoHomepage(page);
        case 'casino':
            return new CasinoHomepage(page);
        case 'vegas':
            return new VegasHomepage(page);
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
