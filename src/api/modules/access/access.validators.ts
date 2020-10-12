import joi from '@hapi/joi';

import { ICredentials, IRefreshTokenPayload } from '~api/modules/access/types';

export const credentialsSchema = joi.object<ICredentials>().keys({
    login: joi.string().required(),
    password: joi.string().required()
});

export const refreshTokenSchema = joi.object<IRefreshTokenPayload>().keys({
    refreshToken: joi.string().required()
});
