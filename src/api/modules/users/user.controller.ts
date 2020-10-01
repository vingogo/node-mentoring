import type { Response } from 'express';
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
    requestParam,
    response
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
    }

    @httpGet('/')
    private async getUserList(
        @queryParam('loginSubstring') loginSubstring: string,
        @queryParam('limit') limit: string,
        @response() res: Response<IUserVM[]>
    ) {
        const users = await this.userService.getAutoSuggestUsers(
            loginSubstring,
            parseInt(limit, 10)
        );
        res.json(users);
    }

    @httpGet('/:id')
    private async getUser(
        @requestParam('id') id: string,
        @response() res: Response<IUserVM>
    ) {
        const user = await this.userService.getUser(id);
        res.json(user);
    }

    @httpPost('/')
    private async createUser(
        @requestBody() user: ICreateUserVM,
        @response() res: Response<IUserVM['id']>
    ) {
        const success = await this.userService.createUser(user);
        res.json(success);
    }

    @httpPut('/:id')
    private async updateUser(
        @requestParam('id') id: string,
        @requestBody() user: IUserVM,
        @response() res: Response<IUserVM>
    ) {
        const updatedUser = await this.userService.updateUser({
            ...user,
            id
        });
        res.json(updatedUser);
    }

    @httpDelete('/:id')
    private async deleteUser(
        @requestParam('id') id: string,
        @response() res: Response<boolean>
    ) {
        const success = await this.userService.deleteUser(id);
        res.json(success);
    }
}
