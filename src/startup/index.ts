import { Application } from 'express';
import configureExpress from './express';

export class Startup {
    public static configure(app: Application): void {
        configureExpress(app);
    }
}
