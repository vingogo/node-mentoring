import { Schema } from '@hapi/joi';
import { Request } from 'express';
import { AppError, ErrorCode } from '../models/errors/AppError';
import HTTPCodes from 'http-status-codes';
import { AnyRequestHandler } from '../types/express';

type RequestValidationProp = keyof Pick<Request, 'params' | 'body' | 'query'>;

export function validate(
    schema: Schema,
    prop: RequestValidationProp
): AnyRequestHandler {
    return (req, res, next) => {
        const { error } = schema.validate(req[prop]);
        if (!error) {
            return next();
        }

        const { details } = error;
        const message = details.map((i) => i.message).join(',');

        next(
            new AppError(
                message,
                HTTPCodes.UNPROCESSABLE_ENTITY,
                ErrorCode.ValidationError
            )
        );
    };
}
