import winston, { Logger } from 'winston';

import config from '../config';

export type ILogger = Logger;

const transports: winston.transport[] = [];
if (process.env.NODE_ENV !== 'development') {
    transports.push(new winston.transports.Console());
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.label(),
                winston.format.splat()
            )
        })
    );
}

export const loggerInstance = winston.createLogger({
    level: config.logLevel,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.label(),
        winston.format.json()
    ),
    transports
});
