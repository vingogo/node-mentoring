import type { IUserService } from '../interfaces/IUserService';
import type {
    ICreateUserModel,
    IUpdateUserModel,
    IUserModel,
    IUserVM
} from '../interfaces/IUser';
import { ICreateUserModelResponse } from '../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';
import { getLogger } from '../startup/logger';
import { UserVM } from '../models/user.model';
import { Logger } from 'winston';
import { AppError, ErrorCode } from '../common/models/errors/AppError';

class UserService implements IUserService {
    private userCollection: Map<IUserModel['id'], IUserModel>;
    private readonly logger: Logger;

    constructor() {
        this.logger = getLogger('UserService');
        this.userCollection = new Map();
    }

    getAutoSuggestUsers(
        loginSubstring: string,
        limit: number
    ): Promise<IUserVM[]> {
        return Promise.resolve(
            this.getUserVMs()
                .filter(({ login }) => login.includes(loginSubstring))
                .slice(0, limit)
        );
    }

    async createUser(
        user: ICreateUserModel
    ): Promise<ICreateUserModelResponse> {
        try {
            const id = uuidv4();
            this.userCollection.set(id, {
                ...user,
                isDeleted: false,
                id
            });

            this.logger.info(`User created with id ${id}`);

            return Promise.resolve({ id });
        } catch (e) {
            this.logger.error(e);
            return Promise.reject(e);
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        this.logger.info(`User with id ${id} prepare for deletion`);
        const user = this.getUserByIdOrThrow(id);
        user.isDeleted = true;
        this.logger.info(`User with id ${id} deleted`);
        return Promise.resolve(true);
    }

    async getUser(id: string): Promise<IUserVM> {
        try {
            const user = this.getUserByIdOrThrow(id);

            return Promise.resolve(new UserVM(user));
        } catch (e) {
            this.logger.error(e);
            return Promise.reject(e);
        }
    }

    async updateUser(user: IUpdateUserModel): Promise<IUserVM> {
        const { id } = user;
        this.logger.info(`User with id ${id} prepare for deletion`);

        const original = this.getUserByIdOrThrow(id);
        const updated = {
            ...original,
            ...user
        };

        this.userCollection.set(id, updated);
        this.logger.info(`User with id ${id} updated`);

        return Promise.resolve(new UserVM(updated));
    }

    private getUserByIdOrThrow(id: string): IUserModel {
        this.logger.debug('getUserByIdOrThrow invoked');
        const user = this.userCollection.get(id);

        if (!user || user.isDeleted) {
            this.logger.error('User not found');
            throw new AppError('User not found', 404, ErrorCode.DataError);
        }
        this.logger.debug(user);

        return user;
    }

    private getUserVMs() {
        return Array.from(this.userCollection.values())
            .filter(({ isDeleted }) => !isDeleted)
            .map((user) => new UserVM(user));
    }
}

export const userService = new UserService();
