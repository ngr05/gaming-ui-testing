import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';

export const runCmd = (command: string, options?: { env?: Record<string, string> }) => {
    const proc = spawnSync(command, [], {
        cwd: process.cwd(),
        env: {
            PATH: process.env.PATH,
            ...(options && options.env ? options.env : {}),
        },
        shell: true,
        stdio: ['ignore', process.stdout, process.stderr],
    });
    return proc;
};

export const getPackageVersion = (): string => {
    const json: { version: string } = JSON.parse(readFileSync('./package.json', 'utf8')) as { version: string };
    return json.version;
};
