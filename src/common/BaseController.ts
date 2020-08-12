import { Router } from 'express';

export abstract class BaseController {
    protected route: Router;

    protected constructor(path: string, apiRouter: Router) {
        this.route = Router();

        this.registerActions();

        apiRouter.use(path, this.route);
    }

    protected abstract registerActions(): void;
}
