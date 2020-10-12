import { inject } from 'inversify';
import {
    BaseHttpController,
    controller,
    httpPost,
    requestBody
} from 'inversify-express-utils';

import { validate } from '~api/common/middlewares/validate';
import { API_TYPES } from '~api/startup/constants';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';

import { credentialsSchema, refreshTokenSchema } from './access.validators';
import { IAccessService, ICredentials, IRefreshTokenPayload } from './types';

@controller('/access', API_TYPES.LogMiddleware)
export class AccessController extends BaseHttpController {
    constructor(
        @inject(LOGGER_TYPE) private readonly logger: ILogger,
        @inject(API_TYPES.AccessService)
        private readonly accessService: IAccessService
    ) {
        super();
    }

    @httpPost('/login', validate(credentialsSchema, 'body'))
    private async login(@requestBody() credentials: ICredentials) {
        const result = await this.accessService.signIn(credentials);
        return this.json(result);
    }

    @httpPost('/refresh', validate(refreshTokenSchema, 'body'))
    private async refresh(@requestBody() payload: IRefreshTokenPayload) {
        const result = await this.accessService.refresh(payload.refreshToken);
        return this.json(result);
    }
}
