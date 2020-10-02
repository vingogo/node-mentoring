import { Application } from 'express';
import configureExpress from './express';
import { Logger } from 'winston';

export class Startup {
    public static configure(app: Application, logger: Logger): void {
        configureExpress(app, logger);
    }
}
