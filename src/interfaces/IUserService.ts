import type {
    ICreateUserModel,
    ICreateUserModelResponse,
    IUpdateUserModel,
    IUserVM
} from './IUser';

export interface IUserService {
    getAutoSuggestUsers(
        loginSubstring: string,
        limit: number
    ): Promise<IUserVM[]>;
    getUser(id: string): Promise<IUserVM>;
    createUser(user: ICreateUserModel): Promise<ICreateUserModelResponse>;
    updateUser(user: IUpdateUserModel): Promise<IUserVM>;
    deleteUser(id: string): Promise<boolean>;
}
