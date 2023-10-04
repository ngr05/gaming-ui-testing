export enum UserAccountType {
    VERIFIED = 'verified',
}

export interface Customer {
    pin: string;
    username: string;
}

export const getAccount = async (type: UserAccountType = UserAccountType.VERIFIED): Promise<Customer> => {
    // Dummmy promise before we implement proper user accounts to get round linting rules
    await new Promise((res) => res('something'));
    switch (type) {
        case UserAccountType.VERIFIED:
        default:
            return {
                pin: '1212',
                username: 'GREENYGBP',
            };
    }
};
