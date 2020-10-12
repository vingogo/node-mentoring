export interface ICredentials {
    login: string;
    password: string;
}

export interface IAccessService {
    checkAccess(credentials: ICredentials): Promise<boolean>;
}
