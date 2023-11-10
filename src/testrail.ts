import { join } from 'path';

/**
 * The ID of the TestRail project
 */
const project = 30;

const user = 'nicholas.green@flutteruki.com';
const key = 'tNtO1qwKM9kQGbAPXOHr-TbloNX3y.TwgBi/88Fa9';

/**
 * The TestRail host
 */
export const hostname = 'https://skybettingandgaming.testrail.com';
const uri = '/index.php?/api/v2/';

interface ConfigGroup {
    id: number;
    name: string;
    configs: Configuration[];
}

export interface Configuration {
    id: number;
    name: string;
}

enum RequestMethod {
    GET = 'get',
    POST = 'post',
}

interface RequestOptions {
    body?: string;
    headers: Headers;
    method: RequestMethod;
    redirect?: 'follow';
}

interface TestPlanResponse {
    id: number;
}

export const addPlan = async (name: string, description?: string): Promise<number> => {
    try {
        const response = await fetch(
            join(hostname, uri, 'add_plan', project.toString()),
            getOptions(RequestMethod.POST, {
                description,
                name,
            }),
        );
        const json: TestPlanResponse = (await response.json()) as { id: number };
        return json.id;
    } catch (error) {
        console.log('error:', error);
        throw error;
    }
};

export const closePlan = async (id: number): Promise<void> => {
    try {
        await fetch(join(hostname, uri, 'close_plan', id.toString()), getOptions(RequestMethod.POST, {}));
    } catch (error) {
        console.log('error:', error);
        throw error;
    }
};

export const getConfigs = async (): Promise<ConfigGroup> => {
    try {
        const response = await fetch(
            join(hostname, uri, 'get_configs', project.toString()),
            getOptions(RequestMethod.GET),
        );
        const json = (await response.json()) as ConfigGroup[];
        const group = json.find((grp: ConfigGroup) => grp.name === 'Browsers');
        if (!group) {
            throw new Error('could not find broswer config group');
        }
        return group;
    } catch (error) {
        console.log('error:', error);
        throw error;
    }
};

const getOptions = (method: RequestMethod, body?: object): RequestOptions => {
    if (body && method !== RequestMethod.POST) {
        throw new Error('If you are posting you need a request body...');
    }
    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(`${user}:${key}`)}`);
    headers.append('Content-Type', 'application/json');
    const options: RequestOptions = {
        headers,
        method,
        redirect: 'follow',
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    return options;
};

export const storeCommand = (title: string, file: string, plan: number, config: number): string => {
    return `trcli \
        --yes \
        --host https://skybettingandgaming.testrail.com/ \
        --project "Gaming UI" \
        --username ${user} \
        --key "${key}" \
        parse_junit \
        --plan-id "${plan}" \
        --config-ids "${config}" \
        --title "${title}" \
        --file "./test-results/${file}"`;
};
