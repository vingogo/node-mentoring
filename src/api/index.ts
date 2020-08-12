import { Router } from 'express';
import * as controllers from './controllers';

export class Api {
    private static readonly router: Router = Router();

    public static init(): Router {
        Api.registerControllers();
        return Api.router;
    }

    private static registerControllers() {
        Object.values(controllers).forEach(
            (controller) => new controller(Api.router)
        );
    }
}
