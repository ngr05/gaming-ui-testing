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
const url = 'https://aus.live.skybet.net/v1/';

export const getAccount = async (type = UserAccountType.VERIFIED): Promise<Customer> => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    try {
        const customer = (await makeRequest(`${url}user?env=${getEnvironment()}&type=${type}`)) as Customer;
        return customer;
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
            return UserEnvironments.STAGING;
        case 'next':
        case 'test2':
            return UserEnvironments.TEST;
        default:
            throw new Error('please specify a valid environment to run the tests on!');
    }
};

const makeRequest = async (url: string, options: object = {}): Promise<object> => {
    const response = await fetch(url, { method: 'POST', ...options });
    return (await response.json()) as object;
};

export const releaseAccount = async (account: Customer): Promise<void> => {
    try {
        const result = (await makeRequest(`${url}release?env=${getEnvironment()}&username=${account.username}`)) as {
            message: string;
        };
        if (result.message !== 'Success') {
            console.error('response from release', JSON.stringify(result));
            throw new Error('no success message from the service when releasing!');
        }
    } catch (e) {
        console.warn(`unable to release account ${account.username}! ${(e as Error).message}`);
    }
};
