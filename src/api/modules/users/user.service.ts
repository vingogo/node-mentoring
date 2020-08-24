import { ICreateUserVM, IUserService, IUserVM } from './types';
import { IUserService as IIntegrationUserService } from '~integration/users/types';
import { Logger } from 'winston';
import { UserVM } from '~api/modules/users/user.model';

export class UserService implements IUserService {
    constructor(
        private userService: IIntegrationUserService,
        private logger: Logger
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
