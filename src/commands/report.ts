import { readdir } from 'fs/promises';

import { Configuration, addPlan, closePlan, getConfigs, hostname, setUser, storeCommand } from '../testrail';
import { runCmd } from './utils';

export interface ReportOptions {
    key?: string;
    testrail?: boolean;
    title?: string;
    username?: string;
}

export default async (options: ReportOptions) => {
    const command = 'npx playwright show-report';

    if (options.testrail) {
        if (!options.key || !options.title || !options.username) {
            throw new Error(
                'To report to testrail please ensure you provide a username, key and a title for the report. For more info run $ gput report --help',
            );
        }
        setUser(options.username, options.key);
        const plan = await addPlan(options.title);
        console.log(`test plan created: ${hostname}/index.php?/plans/view/${plan}`);
        const configGrp = await getConfigs();
        const files = (await readdir('./test-results')).filter((file) => /^testrail\.[a-z]+\.xml$/.exec(file));
        for (const file of files) {
            const config = configGrp.configs.find((grp: Configuration) => {
                const regex = new RegExp(`${grp.name.slice(0, -1)}`, 'i');
                if (regex.exec(file)) {
                    return grp.id;
                }
            });
            if (!config) {
                console.error(`Could not determine the config for the test results ${file}`);
                continue;
            }
            console.log(`adding test run with ${config.name} config`);
            runCmd(storeCommand(`${options.title} - ${config.name}`, file, plan, config.id));
        }

        await closePlan(plan);
        console.log('test plan closed');
        return;
    }

    runCmd(command);
};
