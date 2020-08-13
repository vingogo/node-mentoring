import HTTPStatus from 'http-status-codes';
import createHttpError, { HttpError } from 'http-errors';
import type { Router, Request, Response } from 'express';
import type { Params } from 'express-serve-static-core';
import type {
    ICreateUserModel,
    ICreateUserModelResponse,
    IUpdateUserModel,
    IUserVM
} from '../../interfaces/IUser';

import { BaseController } from '../../common/BaseController';
import { IUserService } from '../../interfaces/IUserService';
import { userService } from '../../services/user.service';
import { getLogger } from '../../startup/logger';
import { Logger } from 'winston';

export class UsersController extends BaseController {
    private readonly userService: IUserService;
    private readonly logger: Logger;

    constructor(router: Router) {
        super('/users', router);
        this.userService = userService;
        this.logger = getLogger('UsersController');
    }

    protected registerActions(): void {
        this.route.get('/', this.getUserList.bind(this));
        this.route.post('/', this.createUser.bind(this));
        this.route.get('/:id', this.getUser.bind(this));
        this.route.put('/:id', this.updateUser.bind(this));
        this.route.delete('/:id', this.deleteUser.bind(this));
    }

    private async getUserList(
        req: Request<{ loginSubstring: string; limit: string }>,
        res: Response<IUserVM[] | HttpError>
    ) {
        try {
            const { loginSubstring, limit } = { ...req.params, ...req.query };

            const users = await this.userService.getAutoSuggestUsers(
                loginSubstring,
                parseInt(limit, 10)
            );

            res.json(users);
        } catch (e) {
            this.logger.error(e);
            res.send(createHttpError(HTTPStatus.BAD_REQUEST, e.message));
        }
    }

    private async getUser(
        req: Request<{ id: string }>,
        res: Response<IUserVM | HttpError | null>
    ) {
        try {
            const { id } = req.params;
            this.logger.debug('id', id);

            const user = await this.userService.getUser(id);

            res.json(user);
        } catch (e) {
            this.logger.error(e);
            res.send(createHttpError(HTTPStatus.BAD_REQUEST, 'User not found'));
        }
    }

    private async createUser(
        req: Request<Params, unknown, ICreateUserModel>,
        res: Response<ICreateUserModelResponse | HttpError>
    ) {
        try {
            const user = req.body;
            const success = await this.userService.createUser(user);
            res.json(success);
        } catch (e) {
            this.logger.error(e);
            res.send(createHttpError(HTTPStatus.BAD_REQUEST, 'Unknown Error'));
        }
    }

    private async updateUser(
        req: Request<{ id: string }, unknown, IUpdateUserModel>,
        res: Response<IUpdateUserModel | HttpError>
    ) {
        try {
            const { id } = req.params;
            const user = req.body;
            const updatedUser = await this.userService.updateUser({
                ...user,
                id
            });
            res.json(updatedUser);
        } catch (e) {
            this.logger.error(e);
            res.send(createHttpError(HTTPStatus.BAD_REQUEST, 'Unknown Error'));
        }
    }

    private async deleteUser(
        req: Request<{ id: string }>,
        res: Response<boolean | HttpError>
    ) {
        try {
            const { id } = req.params;
            const success = await this.userService.deleteUser(id);
            res.json(success);
        } catch (e) {
            this.logger.error(e);
            res.send(createHttpError(HTTPStatus.BAD_REQUEST, 'Unknown Error'));
        }
    }
}
