import * as util from 'util';

import { loggerInstance } from '~common/logger';

const logFinish = (hrstart: [number, number], name: string | symbol) => {
    const hrend = process.hrtime(hrstart);
    const executionTime = util.format(
        'Execution time (hr): %ds %dms',
        hrend[0],
        hrend[1] / 1000000
    );
    loggerInstance.debug(
        `Func invocation ${name.toString()} finished | ${executionTime}`
    );
};

// eslint-disable-next-line func-style
export const log: MethodDecorator = function (target, name, descriptor) {
    const original = descriptor.value;

    if (typeof original === 'function') {
        descriptor.value = function (this: unknown, ...args: unknown[]) {
            try {
                loggerInstance.debug(
                    `Func invocation: ${name.toString()} | Args: ${util.inspect(
                        args,
                        {
                            compact: true,
                            depth: 0
                        }
                    )}`
                );
                const hrstart = process.hrtime();
                const result = original.apply(this, args);
                if (result instanceof Promise) {
                    result.then((res) => {
                        logFinish(hrstart, name);
                        return res;
                    });
                } else {
                    logFinish(hrstart, name);
                }

                return result;
            } catch (e) {
                loggerInstance.error(e);
                throw e;
            }
        } as any;
    }
    return descriptor;
};
