import { inject } from 'inversify';
import {
    BaseHttpController,
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    queryParam,
    requestBody,
    requestParam
} from 'inversify-express-utils';

import { API_TYPES } from '~api/startup/inversify';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';

import type { ICreateUserVM, IUserService, IUserVM } from './types';

@controller('/users')
export class UserController extends BaseHttpController {
    constructor(
        @inject(LOGGER_TYPE) private readonly logger: ILogger,
        @inject(API_TYPES.UserService)
        private readonly userService: IUserService
    ) {
        super();
        this.logger.debug('UserController initialized');
    }

    @httpGet('/')
    private async getUserList(
        @queryParam('loginSubstring') loginSubstring: string,
        @queryParam('limit') limit: string
    ) {
        this.logger.debug('getUserList invoked');
        const users = await this.userService.getAutoSuggestUsers(
            loginSubstring,
            parseInt(limit, 10)
        );
        return this.json(users);
    }

    @httpGet('/:id')
    private async getUser(@requestParam('id') id: string) {
        this.logger.debug('getUser invoked');
        const user = await this.userService.getUser(id);
        return this.json(user);
    }

    @httpPost('/')
    private async createUser(@requestBody() user: ICreateUserVM) {
        this.logger.debug('createUser invoked');
        const success = await this.userService.createUser(user);
        return this.json(success);
    }

    @httpPut('/:id')
    private async updateUser(
        @requestParam('id') id: string,
        @requestBody() user: IUserVM
    ) {
        this.logger.debug('updateUser invoked');
        const updatedUser = await this.userService.updateUser({
            ...user,
            id
        });
        return this.json(updatedUser);
    }

    @httpDelete('/:id')
    private async deleteUser(@requestParam('id') id: string) {
        this.logger.debug('deleteUser invoked');
        const success = await this.userService.deleteUser(id);
        return this.json(success);
    }
}
