import joi from '@hapi/joi';
import { ICreateUserModel } from '../../../interfaces/IUser';

export const suggestedUsersSchema = joi.object().keys({
    limit: joi.number().required(),
    loginSubstring: joi.string().required()
});

export const createUserSchema = joi.object<ICreateUserModel>().keys({
    age: joi.number().required().min(4).max(130),
    login: joi.string().required(),
    password: joi.string().required().regex(/\d+/, {
        name: 'numeric'
    }).regex(/\D+/)
});
