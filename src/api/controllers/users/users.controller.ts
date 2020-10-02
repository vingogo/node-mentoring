import type { Request, Response, Router } from 'express';
import type { Params } from 'express-serve-static-core';
import type {
    ICreateUserModel,
    ICreateUserModelResponse,
    IUpdateUserModel,
    IUserVM
} from '../../../interfaces/IUser';
import type { SuggestedUsersRequestParams } from './types';

import { BaseController } from '../../../common/BaseController';
import { IUserService } from '../../../interfaces/IUserService';
import { Logger } from 'winston';
import { createUserSchema, suggestedUsersSchema } from './validators';
import { validate } from '../../../common/middlewares/validate';
import { guidIdSchema } from '../../../common/validators/IdSchemas';
import { IdRequestParam } from '../../../common/types/requestParams';

export class UsersController extends BaseController {
    constructor(
        router: Router,
        logger: Logger,
        private readonly userService: IUserService
    ) {
        super('/users', router, logger);
    }

    protected registerActions(): void {
        this.get(
            '/',
            validate(suggestedUsersSchema, 'query'),
            this.getUserList
        );
        this.post('/', validate(createUserSchema, 'body'), this.createUser);
        this.get('/:id', validate(guidIdSchema, 'params'), this.getUser);
        this.put('/:id', validate(guidIdSchema, 'params'), this.updateUser);
        this.delete('/:id', validate(guidIdSchema, 'params'), this.deleteUser);
    }

    private getUserList = async (
        req: Request<SuggestedUsersRequestParams>,
        res: Response<IUserVM[]>
    ) => {
        const { loginSubstring, limit } = { ...req.params, ...req.query };
        const users = await this.userService.getAutoSuggestUsers(
            loginSubstring,
            parseInt(limit, 10)
        );
        res.json(users);
    };

    private getUser = async (
        req: Request<IdRequestParam>,
        res: Response<IUserVM>
    ) => {
        const { id } = req.params;
        const user = await this.userService.getUser(id);
        res.json(user);
    };

    private createUser = async (
        req: Request<Params, unknown, ICreateUserModel>,
        res: Response<ICreateUserModelResponse>
    ) => {
        const user = req.body;
        const success = await this.userService.createUser(user);
        res.json(success);
    };

    private updateUser = async (
        req: Request<IdRequestParam, unknown, IUpdateUserModel>,
        res: Response<IUpdateUserModel>
    ) => {
        const { id } = req.params;
        const user = req.body;
        const updatedUser = await this.userService.updateUser({
            ...user,
            id
        });
        res.json(updatedUser);
    };

    private deleteUser = async (
        req: Request<IdRequestParam>,
        res: Response<boolean>
    ) => {
        const { id } = req.params;
        const success = await this.userService.deleteUser(id);
        res.json(success);
    };
}
