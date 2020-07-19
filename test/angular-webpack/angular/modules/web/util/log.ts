declare var process: any;
const isDevMode = () => {
    return process.env !== 'production'
}

export function logFactory(module: string): any {
    let log: any;
    if (!isDevMode()) {
        log = function (...args: any[]) {
        };
    } else {
        log = function log(...args: any[]) {
            args.unshift(`[${module.toUpperCase()}] `);
            const result = {};
            for (let index = 0; index < args.length; index++) {
                const stringIndex: string = String(index);
                result[stringIndex] = args[index];
            }
            console.log.apply(console.log, args);
        }
    }
    log.factory = (innerModule: string) => {
        return logFactory(`${module}] [${innerModule}`);
    }
    return log;
}

const log = logFactory('corifeus')

export {log};
