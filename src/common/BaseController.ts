import { RequestHandler, Router } from 'express';
import { Logger } from 'winston';
import { AnyRequestHandler } from './types/express';

export abstract class BaseController {
    protected route: Router;

    protected constructor(
        path: string,
        apiRouter: Router,
        protected logger: Logger
    ) {
        this.route = Router();
        apiRouter.use(path, this.route);
        setImmediate(() => this.registerActions());
    }

    protected abstract registerActions(): void;

    protected get(route: string, ...handlers: AnyRequestHandler[]) {
        this.route.get(route, ...this.getWrappedHandlers(handlers));
    }

    protected post(route: string, ...handlers: AnyRequestHandler[]) {
        this.route.post(route, ...this.getWrappedHandlers(handlers));
    }

    protected put(route: string, ...handlers: AnyRequestHandler[]) {
        this.route.put(route, ...this.getWrappedHandlers(handlers));
    }

    protected delete(route: string, ...handlers: AnyRequestHandler[]) {
        this.route.delete(route, ...this.getWrappedHandlers(handlers));
    }

    private getWrappedHandlers(handlers: RequestHandler[]): RequestHandler[] {
        const [action] = handlers.slice(-1);
        return [...handlers.slice(0, -1), this.asyncHandleError(action)];
    }

    private asyncHandleError = (
        callback: RequestHandler
    ): RequestHandler => async (req, res, next) => {
        try {
            return await callback(req, res, next);
        } catch (e) {
            this.logger.error(e);
            return next(e);
        }
    };
}
