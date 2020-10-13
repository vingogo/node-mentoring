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

import { log } from '~api/common/decorators/log';
import { validate } from '~api/common/middlewares/validate';
import { guidIdSchema } from '~api/common/validators/IdSchemas';
import {
    createUserSchema,
    suggestedUsersSchema
} from '~api/modules/users/user.validators';
import { API_TYPES } from '~api/startup/constants';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';

import type { ICreateUserVM, IUserService, IUserVM } from './types';

@controller('/users', API_TYPES.LogMiddleware, API_TYPES.AuthorizeMiddleware)
export class UserController extends BaseHttpController {
    constructor(
        @inject(LOGGER_TYPE) private readonly logger: ILogger,
        @inject(API_TYPES.UserService)
        private readonly userService: IUserService
    ) {
        super();
    }

    @log
    @httpGet('/', validate(suggestedUsersSchema, 'query'))
    public async getUserList(
        @queryParam('loginSubstring') loginSubstring: string,
        @queryParam('limit') limit: string
    ) {
        const users = await this.userService.getAutoSuggestUsers(
            loginSubstring,
            parseInt(limit, 10)
        );
        return this.json(users);
    }

    @log
    @httpGet('/:id', validate(guidIdSchema, 'params'))
    public async getUser(@requestParam('id') id: string) {
        this.logger.debug('getUser invoked');
        const user = await this.userService.getUser(id);
        return this.json(user);
    }

    @log
    @httpPost('/', validate(createUserSchema, 'body'))
    public async createUser(@requestBody() user: ICreateUserVM) {
        this.logger.debug('createUser invoked');
        const success = await this.userService.createUser(user);
        return this.json(success);
    }

    @log
    @httpPut(
        '/:id',
        validate(createUserSchema, 'body'),
        validate(guidIdSchema, 'params')
    )
    public async updateUser(
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

    @log
    @httpDelete('/:id', validate(guidIdSchema, 'params'))
    public async deleteUser(@requestParam('id') id: string) {
        const success = await this.userService.deleteUser(id);
        return this.json(success);
    }
}
