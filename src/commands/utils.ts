import { spawnSync } from 'child_process';

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
