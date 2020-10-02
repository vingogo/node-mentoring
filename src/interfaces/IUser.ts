export interface IUserModel {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type IUserVM = Omit<IUserModel, 'isDeleted'>;
export type ICreateUserModel = Omit<IUserModel, 'id' | 'isDeleted'>;
export type ICreateUserModelResponse = Pick<IUserModel, 'id'>;
export type IUpdateUserModel = Omit<IUserModel, 'isDeleted'>;
