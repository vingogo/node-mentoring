import { Router } from 'express';
import { init as initUserController } from './modules/users';
import { init as initGroupController } from './modules/groups';

export class Api {
    private static readonly router: Router = Router();

    public static init(): Router {
        Api.registerControllers();
        return Api.router;
    }

    private static registerControllers() {
        initUserController(Api.router);
        initGroupController(Api.router);
    }
}
