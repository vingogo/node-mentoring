import { inject, injectable } from 'inversify';

import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import { getHashCode } from '~common/security';
import { DATA_ACCESS_TYPES } from '~data-access/constants';
import { IUserRepository } from '~data-access/modules';

import { IAccessService, ICredentials } from './types';

@injectable()
export class AccessService implements IAccessService {
    constructor(
        @inject(LOGGER_TYPE) private readonly logger: ILogger,
        @inject(DATA_ACCESS_TYPES.UserRepository)
        private readonly userRepo: IUserRepository
    ) {}

    async checkAccess(credentials: ICredentials): Promise<boolean> {
        const entry = await this.userRepo.getUserByLogin(credentials.login);
        if (!entry) {
            this.logger.info(`User ${credentials.login} not found`);
            return false;
        }

        return getHashCode(credentials.password) === entry.password;
    }
}
