import joi from '@hapi/joi';
import {
    ICreateUserVM,
    SuggestedUsersRequestParams
} from '~api/modules/users/types';

export const suggestedUsersSchema = joi
    .object<SuggestedUsersRequestParams>()
    .keys({
        limit: joi.number().required(),
        loginSubstring: joi.string().required()
    });

export const createUserSchema = joi.object<ICreateUserVM>().keys({
    age: joi.number().required().min(4).max(130),
    login: joi.string().required(),
    password: joi
        .string()
        .required()
        .regex(/\d+/, {
            name: 'numeric'
        })
        .message('Password should contains digits')
        .regex(/\D+/)
        .message('Password should contains letters')
});
