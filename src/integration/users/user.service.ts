import { Logger } from 'winston';
import {
    ICreateUserModel,
    ICreateUserModelResponse,
    IUpdateUserModel,
    IUserModel,
    IUserService
} from '~integration/users/types';
import { AppError, ErrorCode } from '~api/common/models/errors/AppError';
import { IUserRepository } from '~data-access/modules/users';

export class UserService implements IUserService {
    constructor(private userRepo: IUserRepository, private logger: Logger) {}

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
