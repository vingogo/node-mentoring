export interface ICredentials {
    login: string;
    password: string;
}

export interface IRefreshTokenPayload {
    refreshToken: string;
}

export interface ITokensResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IAccessService {
    signIn(credentials: ICredentials): Promise<ITokensResponse>;
    refresh(token: string): Promise<ITokensResponse>;
}

export interface ITokenManager {
    sign(payload: Record<string, string>): string;
    refresh(token: string): string;
    verify(token: string): boolean;
    verifyRefresh(token: string): boolean;
}
