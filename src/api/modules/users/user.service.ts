import { inject, injectable } from 'inversify';

import { UserVM } from '~api/modules/users/user.model';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import { INTEGRATION_TYPES } from '~integration/startup/inversify';
import { IUserService as IIntegrationUserService } from '~integration/users/types';

import { ICreateUserVM, IUserService, IUserVM } from './types';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(INTEGRATION_TYPES.UserService)
        private readonly userService: IIntegrationUserService,
        @inject(LOGGER_TYPE) private logger: ILogger
    ) {}

    async createUser(user: ICreateUserVM): Promise<IUserVM['id']> {
        const { id } = await this.userService.createUser(user);
        return id;
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userService.deleteUser(id);
    }

    async getAutoSuggestUsers(
        loginSubstring: string,
        limit: number
    ): Promise<IUserVM[]> {
        const users = await this.userService.getAutoSuggestUsers(
            loginSubstring,
            limit
        );
        return users.map((user) => new UserVM(user));
    }

    async getUser(id: string): Promise<IUserVM> {
        const user = await this.userService.getUser(id);
        return new UserVM(user);
    }

    async updateUser(user: IUserVM): Promise<IUserVM> {
        const response = await this.userService.updateUser(user);
        return new UserVM(response);
    }
}
