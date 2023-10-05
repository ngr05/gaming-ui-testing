export enum UserAccountType {
    CLOSED = 'closed',
    EURO = 'euro',
    EXCLUDED = 'excluded',
    LOCKED = 'locked',
    REALITYCHECK = 'realitycheck',
    SUSPENDED = 'suspended',
    UNVERIFIED = 'unverified',
    VERIFIED = 'verified',
}

enum UserEnvironments {
    LIVE = 'live',
    STAGING = 'staging',
    TEST = 'test2',
}

export interface Customer {
    pin: string;
    username: string;
}

// The location of the automation user service.
// Details and docs can be found here: https://stash.skybet.net/projects/GPERF/repos/aws-terraform-aus/browse
const url = 'https://aus.live.skybet.net/v1/user';

export const getAccount = async (type = UserAccountType.VERIFIED): Promise<Customer> => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    try {
        const response = await fetch(`${url}?env=${getEnvironment()}&type=${type}`, { method: 'POST' });
        return (await response.json()) as Customer;
    } catch (e) {
        console.error('issue with getting account details for testing');
        console.error((e as Error).message);
        throw e;
    }
};

const getEnvironment = (): UserEnvironments => {
    switch (process.env.ENVIRONMENT) {
        case 'live':
            return UserEnvironments.LIVE;
        case 'staging':
        case 'next':
            return UserEnvironments.STAGING;
        case 'test':
        case 'test2':
            return UserEnvironments.TEST;
        default:
            throw new Error('please specify a valid environment to run the tests on!');
    }
};
