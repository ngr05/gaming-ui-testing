import { Page } from '@playwright/test';

import ProductContainer from '../components/productContainer.component';

import GameInfo from '../page/gameInfo.page';
import Homepage from '../page/home.page';
import Promotions from '../page/promotions.page';

import BingoContainer from '../components/bingo/productContainer.component';
import CasinoContainer from '../components/casino/productContainer.component';
import VegasContainer from '../components/vegas/productContainer.component';

import BingoGameInfo from '../page/bingo/gameInfo.page';
import CasinoGameInfo from '../page/casino/gameInfo.page';
import VegasGameInfo from '../page/vegas/gameInfo.page';

import BingoHomepage from '../page/bingo/home.page';
import CasinoHomepage from '../page/casino/home.page';
import VegasHomepage from '../page/vegas/home.page';

import BingoPromotions from '../page/bingo/promo.page';
import CasinoPromotions from '../page/casino/promo.page';
import VegasPromotions from '../page/vegas/promo.page';

export const getProductContainer = (page: Page): ProductContainer => {
    switch (process.env.PRODUCT) {
        case 'bingo':
            return new BingoContainer(page);
        case 'casino':
            return new CasinoContainer(page);
        case 'vegas':
            return new VegasContainer(page);
        default:
            throw new Error('cannot work out the right product container instance!');
    }
};

export const getGameInfoPage = (page: Page): GameInfo => {
    switch (process.env.PRODUCT) {
        case 'bingo':
            return new BingoGameInfo(page);
        case 'casino':
            return new CasinoGameInfo(page);
        case 'vegas':
            return new VegasGameInfo(page);
        default:
            throw new Error('cannot work out the right game info page instance!');
    }
};

export const getHomePage = (page: Page): Homepage => {
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
            throw new Error('cannot work out the right promo page instance!');
    }
};
