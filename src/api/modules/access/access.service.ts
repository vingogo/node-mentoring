import { inject, injectable } from 'inversify';

import { AppError, ErrorCode } from '~api/common/models/errors/AppError';
import { API_TYPES } from '~api/startup/constants';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import { IAccessService as IIntegrationAccessService } from '~integration/access/types';
import { INTEGRATION_TYPES } from '~integration/startup/inversify';

import {
    IAccessService,
    ICredentials,
    ITokenManager,
    ITokensResponse
} from './types';

@injectable()
export class AccessService implements IAccessService {
    constructor(
        @inject(LOGGER_TYPE) private readonly logger: ILogger,
        @inject(INTEGRATION_TYPES.AccessService)
        private readonly accessService: IIntegrationAccessService,
        @inject(API_TYPES.TokenManager)
        private readonly tokenManager: ITokenManager
    ) {}

    async signIn(credentials: ICredentials): Promise<ITokensResponse> {
        const hasAccess = await this.accessService.checkAccess(credentials);
        if (!hasAccess) {
            throw new AppError('Unauthorized', 401, ErrorCode.Authorization);
        }
        return this.generateTokenPair();
    }

    private generateTokenPair(): Promise<ITokensResponse> {
        const accessToken = this.tokenManager.sign({});

        return new Promise((resolve) => {
            setTimeout(
                () =>
                    resolve({
                        accessToken,
                        refreshToken: this.tokenManager.refresh(accessToken)
                    }),
                3000
            );
        });
    }

    async refresh(token: string) {
        if (this.tokenManager.verifyRefresh(token)) {
            return this.generateTokenPair();
        }
        throw new AppError('Unauthorized', 401, ErrorCode.Authorization);
    }
}
