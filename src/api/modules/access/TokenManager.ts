import { injectable } from 'inversify';
import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { ITokenManager } from '~api/modules/access/types';

import config from '../../../config';

@injectable()
export class TokenManager implements ITokenManager {
    private readonly secret: string;
    private readonly secretPub: string;
    private readonly defaultAccessOptions: SignOptions;
    private readonly defaultRefreshOptions: SignOptions;

    constructor() {
        this.secret = config.jwtSecret;
        this.secretPub = config.jwtSecretPub;
        this.defaultAccessOptions = {
            audience: 'NodeMentoring',
            algorithm: 'HS256',
            noTimestamp: false,
            expiresIn: '2m',
            notBefore: '2s'
        };
        this.defaultRefreshOptions = {
            ...this.defaultAccessOptions,
            expiresIn: '2h'
        };
    }

    refresh(token: string): string {
        const payload = jwt.verify(
            token,
            this.secret,
            this.defaultAccessOptions
        ) as Record<string, unknown>;
        if (typeof payload === 'object') {
            delete payload.iat;
            delete payload.exp;
            delete payload.nbf;
            delete payload.jti;
            delete payload.aud;
        }

        return jwt.sign(payload, this.secretPub, {
            ...this.defaultRefreshOptions,
            jwtid: uuidv4()
        });
    }

    sign(payload: Record<string, string>): string {
        return jwt.sign(payload, this.secret, {
            ...this.defaultAccessOptions,
            jwtid: uuidv4()
        });
    }

    verify(token: string): boolean {
        return Boolean(
            jwt.verify(token, this.secret, this.defaultAccessOptions)
        );
    }

    verifyRefresh(token: string): boolean {
        return Boolean(
            jwt.verify(token, this.secretPub, this.defaultRefreshOptions)
        );
    }
}
