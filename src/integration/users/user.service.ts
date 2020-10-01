import { inject, injectable } from 'inversify';

import { AppError, ErrorCode } from '~api/common/models/errors/AppError';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import { DATA_ACCESS_TYPES } from '~data-access/constants';
import { IUserRepository } from '~data-access/modules/users';
import {
    ICreateUserModel,
    ICreateUserModelResponse,
    IUpdateUserModel,
    IUserModel,
    IUserService
} from '~integration/users/types';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(DATA_ACCESS_TYPES.UserRepository)
        private readonly userRepo: IUserRepository,
        @inject(LOGGER_TYPE) private readonly logger: ILogger
    ) {}

    async getAutoSuggestUsers(
        loginSubstring: string,
        limit: number
    ): Promise<IUserModel[]> {
        return this.userRepo.get(limit, loginSubstring);
    }

    async createUser(
        user: ICreateUserModel
    ): Promise<ICreateUserModelResponse> {
        try {
            return this.userRepo.create(user).then(({ id }) => ({ id }));
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepo.delete(id);
    }

    async getUser(id: string): Promise<IUserModel> {
        try {
            const user = await this.userRepo.getById(id);
            if (!user) {
                throw new AppError('User not found', 404, ErrorCode.DataError);
            }

            return user;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async updateUser(user: IUpdateUserModel): Promise<IUserModel> {
        return this.userRepo.update(user);
    }
}
