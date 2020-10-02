import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';

@injectable()
export class LogRequestMiddleware extends BaseMiddleware {
    constructor(@inject(LOGGER_TYPE) private logger: ILogger) {
        super();
    }

    handler(req: Request, res: Response, next: NextFunction): void {
        const { method, url } = req;
        this.logger.info(`${method} ${url}`);
        next();
    }
}
