export interface IUserModel {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type ICreateUserModelResponse = Pick<IUserModel, 'id'>;
export type ICreateUserModel = Omit<IUserModel, 'id' | 'isDeleted'>;
export type IUpdateUserModel = Omit<IUserModel, 'isDeleted'>;

export interface IUserService {
    getAutoSuggestUsers(
        loginSubstring: string,
        limit: number
    ): Promise<IUserModel[]>;

    getUser(id: string): Promise<IUserModel>;

    createUser(user: ICreateUserModel): Promise<ICreateUserModelResponse>;

    updateUser(user: IUpdateUserModel): Promise<IUserModel>;

    deleteUser(id: string): Promise<boolean>;
}
