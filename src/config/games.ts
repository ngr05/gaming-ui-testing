export interface GameProvider {
    name: string;
    slug: string;
}

interface GameProviderPerEnvironment {
    name: string;
    test: string;
    staging?: string;
    live: string;
}

const games: {
    bingo: GameProviderPerEnvironment[];
    casino: GameProviderPerEnvironment[];
    vegas: GameProviderPerEnvironment[];
} = {
    bingo: [
        {
            name: '1x2gaming',
            test: '',
            staging: 'prospector-wilds-gold-digga',
            live: 'prospector-wilds-gold-digga',
        },
        {
            name: 'Authentic',
            test: '',
            staging: '7s-on-fire-roulette',
            live: '7s-on-fire-roulette',
        },
        {
            name: 'Avatar UX',
            test: '',
            staging: 'reef-pop',
            live: 'reef-pop',
        },
        {
            name: 'Big Time Gaming',
            test: '',
            staging: 'bonanza-falls',
            live: '',
        },
        {
            name: 'Blueprint',
            test: '',
            staging: 'king-kong-cash-even-bigger-bananas-jackpot-king',
            live: 'king-kong-cash-even-bigger-bananas-jackpot-king',
        },
        {
            name: 'Core',
            test: '',
            staging: 'roll-out-the-barrel',
            live: 'roll-out-the-barrelfff',
        },
        {
            name: 'DWG',
            test: '',
            staging: 'pool-pong-luckytap',
            live: 'pool-pong-luckytap',
        },
        {
            name: 'Elk Studios',
            test: '',
            staging: 'gladiatoro',
            live: 'gladiatoro',
        },
        {
            name: 'Fantasma Games AB',
            test: '',
            staging: 'wicked-kitty',
            live: 'wicked-kitty',
        },
        {
            name: 'Gaming Realms',
            test: '',
            staging: 'slingo-full-house',
            live: 'slingo-full-house',
        },
        {
            name: 'IGT',
            test: '',
            staging: 'cleopatra-grand',
            live: 'cleopatra-grand',
        },
        {
            name: 'Inspired',
            test: '',
            staging: 'bullion-bars-gold-collector',
            live: 'bullion-bars-gold-collector',
        },
        {
            name: 'iSoftBet',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'IWG',
            test: 'wish-upon-a-jackpot-multiplier',
            staging: 'lucky-rainbow-sa',
            live: 'lucky-rainbow',
        },
        {
            name: 'Lightning Box Games',
            test: '',
            staging: 'chicken-fox-5xss',
            live: 'chicken-fox-5xss',
        },
        {
            name: "Play'n Go",
            test: '',
            staging: 'honey-rush-100',
            live: 'honey-rush-100',
        },
        {
            name: 'Playtech',
            test: '',
            staging: '',
            live: 'age-of-the-gods-athena-vs-ares',
        },
        {
            name: 'Playzido',
            test: '',
            staging: 'hot-offer-deluxe',
            live: 'hot-offer-deluxe',
        },
        {
            name: 'Pragmatic',
            test: '',
            staging: 'snakes-and-ladders-megadice',
            live: 'snakes-and-ladders-megadice',
        },
        {
            name: 'Push Gaming',
            test: '',
            staging: '10-swords',
            live: '10-swords',
        },
        {
            name: 'Red Tiger',
            test: '',
            staging: 'here-kitty-kitty',
            live: 'here-kitty-kitty',
        },
        {
            name: 'SGD',
            test: 'rainbow-riches-megaways',
            staging: 'perfect-peacock-coin-combo',
            live: 'perfect-peacock-coin-combo',
        },
        {
            name: 'VF',
            test: '',
            staging: 'dond-make-it-a-jackpot-slot',
            live: 'dond-make-it-a-jackpot-slot',
        },
        {
            name: 'VF Eyecon',
            test: 'shamrock-drops',
            staging: 'fluffy-favourites-fairground',
            live: 'fluffy-favourites-fairground',
        },
    ],
    casino: [
        {
            name: 'Playtech',
            test: 'great-blue',
            live: 'great-blue',
        },
    ],
    vegas: [
        {
            name: '1x2gaming',
            test: '',
            staging: 'megaways-jack',
            live: 'megaways-jack',
        },
        {
            name: '4ThePlayer',
            test: '',
            staging: '4-fantastic-lobsters',
            live: '4-fantastic-lobsters',
        },
        {
            name: 'Authentic',
            test: '',
            staging: 'rainbow-riches-live',
            live: '7s-on-fire-roulette',
        },
        {
            name: 'Avatar UX',
            test: '',
            staging: 'reef-pop',
            live: 'reef-pop',
        },
        {
            name: 'Bang Bang Games',
            test: '',
            staging: 'super-jokrz-wild-ultraudge',
            live: 'super-jokrz-wild-ultraudge',
        },
        {
            name: 'Big Time Gaming',
            test: '',
            staging: 'bonanza-falls',
            live: '',
        },
        {
            name: 'Blueprint',
            test: 'genie-jackpots',
            staging: 'genie-jackpots',
            live: 'genie-jackpots',
        },
        {
            name: 'Cayetano',
            test: '',
            staging: 'ostrich-luck',
            live: 'ostrich-luck',
        },
        {
            name: 'Core via GGN',
            test: '',
            staging: 'luckys-magic-clover',
            live: 'luckys-magic-clover',
        },
        {
            name: 'Core',
            test: 'luckys-jackpot-tavern-html',
            staging: 'luckys-jackpot-tavern-html',
            live: 'luckys-jackpot-tavern-html',
        },
        {
            name: 'Dream Spin',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'DWG',
            test: '',
            staging: 'pop-a-shot-luckytap',
            live: 'pop-a-shot-luckytap',
        },
        {
            name: 'Elk Studios',
            test: '',
            staging: 'gladiatoro',
            live: 'gladiatoro',
        },
        {
            name: 'Evolution',
            test: '',
            staging: 'crazy-pachinko',
            live: 'crazy-pachinko',
        },
        {
            name: 'Fantasma Games AB',
            test: '',
            staging: 'cloud-corsairs',
            live: 'cloud-corsairs',
        },
        {
            name: 'Gaming Realms',
            test: '',
            staging: 'slingo-tetris',
            live: 'slingo-tetris',
        },
        {
            name: 'Hacksaw Gaming',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'IGT',
            test: '',
            staging: 'cool-catch',
            live: 'cool-catch',
        },
        {
            name: 'Ingenuity',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'Inspired',
            test: '',
            staging: 'golden-winner',
            live: 'golden-winner',
        },
        {
            name: 'iSoftBet',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'NetEnt',
            test: '',
            staging: 'superstars',
            live: 'superstars',
        },
        {
            name: 'Novomatic (Greentube)',
            test: '',
            staging: 'piggy-prizes-wand-of-riches',
            live: 'piggy-prizes-wand-of-riches',
        },
        {
            name: 'Octoplay',
            test: '',
            staging: 'zeus-smash',
            live: '',
        },
        {
            name: 'Openbet',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'Pixiu',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'Playjeux',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: "Play'n Go",
            test: '',
            staging: 'sherwood-gold',
            live: 'sherwood-gold',
        },
        {
            name: 'Playtech',
            test: '',
            staging: 'jumanji-the-bonus-level-live',
            live: 'jumanji-the-bonus-level-live',
        },
        {
            name: 'Playzido',
            test: '',
            staging: 'the-godfather',
            live: 'the-godfather',
        },
        {
            name: 'Pragmatic',
            test: '',
            staging: 'big-bass-hold-and-spinner-megaways',
            live: 'big-bass-hold-and-spinner-megaways',
        },
        {
            name: 'Push Gaming',
            test: '',
            staging: 'fish-n-nudge',
            live: 'fish-n-nudge',
        },
        {
            name: 'Red Tiger',
            test: '',
            staging: 'dragons-clusterbuster',
            live: 'dragons-clusterbuster',
        },
        {
            name: 'Reel Play',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'Rogue',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'SGD',
            test: '',
            staging: 'perfect-peacock-coin-combo',
            live: 'perfect-peacock-coin-combo',
        },
        {
            name: 'Spinberry',
            test: '',
            staging: '',
            live: '',
        },
        {
            name: 'Spribe',
            test: '',
            staging: 'aviator',
            live: 'aviator',
        },
        {
            name: 'Stars',
            test: '800-pound-gorilla',
            staging: '800-pound-gorilla',
            live: '800-pound-gorilla',
        },
    ],
};

export const providers = (): GameProvider[] => {
    const { ENVIRONMENT, PRODUCT } = process.env;
    const product = games[`${PRODUCT}`] as GameProviderPerEnvironment[];
    return product.map((provider: GameProvider) => {
        const slug = provider[`${['next', 'test2'].includes(ENVIRONMENT) ? 'test' : ENVIRONMENT}`] as string;
        return {
            name: provider.name,
            slug,
        };
    });
};

export const getRandomGame = (): GameProvider => {
    const data = providers();
    let count = 0;
    let game;
    while (!game && count < data.length) {
        game = data[Math.floor(Math.random() * data.length)];
        if (game.name === 'vf' || game.slug === '') {
            game = undefined;
        }
        count++;
    }
    if (!game) {
        throw new Error('cannot find a useable game for the test!');
    }
    return game;
};
