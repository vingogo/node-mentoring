import { IUserModel } from '~integration/users/types';

export type SuggestedUsersRequestParams = {
    loginSubstring: string;
    limit: string;
};

export type IUserVM = Omit<IUserModel, 'isDeleted'>;
export type ICreateUserVM = Omit<IUserModel, 'id' | 'isDeleted'>;

export interface IUserService {
    getAutoSuggestUsers(
        loginSubstring: string,
        limit: number
    ): Promise<IUserVM[]>;

    getUser(id: string): Promise<IUserVM>;

    createUser(user: ICreateUserVM): Promise<IUserVM['id']>;

    updateUser(user: IUserVM): Promise<IUserVM>;

    deleteUser(id: IUserVM['id']): Promise<boolean>;
}
