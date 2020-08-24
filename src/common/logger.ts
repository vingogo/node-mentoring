import winston from 'winston';
import config from '../config';

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

export function getLogger(moduleName: string) {
    console.log(`Initializing logger for: ${moduleName}`);
    winston.loggers.add(moduleName, {
        level: config.logLevel,
        levels: winston.config.npm.levels,
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            winston.format.label({ label: moduleName, message: true }),
            winston.format.json()
        ),
        transports
    });

    return winston.loggers.get(moduleName);
}
