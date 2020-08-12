import type { IUserService } from '../interfaces/IUserService';
import type {
    ICreateUserModel,
    IUpdateUserModel,
    IUserModel,
    IUserVM
} from '../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';
import logger from '../startup/logger';
import { UserVM } from '../models/user.model';
import { ICreateUserModelResponse } from '../interfaces/IUser';

class UserService implements IUserService {
    private userCollection: IUserModel[];

    constructor() {
        this.userCollection = [
            {
                id: '1',
                password: 'test',
                login: 'test',
                isDeleted: false,
                age: 123
            }
        ];
    }

    async createUser(
        user: ICreateUserModel
    ): Promise<ICreateUserModelResponse> {
        try {
            const id = uuidv4();
            this.userCollection.push({
                ...user,
                isDeleted: false,
                id
            });

            logger.info(`User created with id ${id}`);

            return Promise.resolve({ id });
        } catch (e) {
            logger.error(e);
            return Promise.reject();
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        logger.info(`User with id ${id} prepare for deletion`);
        const user = this.getUserByIdOrThrow(id);
        user.isDeleted = true;
        logger.info(`User with id ${id} deleted`);
        return Promise.resolve(true);
    }

    async getUser(id: string): Promise<IUserVM> {
        try {
            logger.info(`User with id ${id} requested`);
            const user = this.getUserByIdOrThrow(id);
            logger.debug('user', user);

            return Promise.resolve(new UserVM(user));
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async getUsers(): Promise<IUserVM[]> {
        logger.info('User collection requested');
        return Promise.resolve(
            this.userCollection.filter(({ isDeleted }) => !isDeleted)
        );
    }

    async updateUser(user: IUpdateUserModel): Promise<IUserVM> {
        const { id } = user;
        logger.info(`User with id ${id} prepare for deletion`);
        const index = this.userCollection.findIndex(
            ({ id: userId }) => userId === id
        );
        if (index < 0) {
            logger.error('User not found');
            throw new Error('User not found');
        }

        const original = this.getUserByIdOrThrow(id);
        const updated = {
            ...original,
            ...user
        };
        this.userCollection = [
            ...this.userCollection.slice(0, index),
            updated,
            ...this.userCollection.slice(index + 1)
        ];
        logger.info(`User with id ${id} updated`);

        return Promise.resolve(updated);
    }

    private getUserByIdOrThrow(id: string): IUserModel {
        logger.debug('getUserByIdOrThrow invoked');
        const user = this.userCollection.find(
            ({ id: userId }) => userId === id
        );

        if (!user || user.isDeleted) {
            logger.error('User not found');
            throw new Error('User not found');
        }
        logger.debug(user);

        return user;
    }
}

export const userService = new UserService();
