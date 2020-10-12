import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { AppError, ErrorCode } from '~api/common/models/errors/AppError';
import { ITokenManager } from '~api/modules/access/types';
import { API_TYPES } from '~api/startup/constants';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';

@injectable()
export class AuthorizeMiddleware extends BaseMiddleware {
    constructor(
        @inject(LOGGER_TYPE) private readonly logger: ILogger,
        @inject(API_TYPES.TokenManager)
        private readonly tokenManager: ITokenManager
    ) {
        super();
    }

    handler(req: Request, res: Response, next: NextFunction): void {
        const token = req.header('Authorization');

        if (!token) {
            this.logger.info('token not provided');
            return next(
                new AppError('Unauthorized', 401, ErrorCode.Authorization)
            );
        }

        this.logger.debug(`Token received: ${token}`);

        if (!token.startsWith('Bearer')) {
            this.logger.info('wrong auth scheme');
            return next(
                new AppError('Unauthorized', 401, ErrorCode.Authorization)
            );
        }
        const [, jwtToken] = token.split(' ');

        if (!this.tokenManager.verify(jwtToken)) {
            return next(
                new AppError('Unauthorized', 401, ErrorCode.Authorization)
            );
        }
        next();
    }
}
