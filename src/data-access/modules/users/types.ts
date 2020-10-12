export interface IUserModel {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type ICreateUserModelDTO = Omit<IUserModel, 'id' | 'isDeleted'>;
export type IUpdateUserModelDTO = Pick<IUserModel, 'id'> &
    Partial<ICreateUserModelDTO>;

export interface IUserRepository {
    get(limit: number, substr: string): Promise<IUserModel[]>;
    getById(id: IUserModel['id']): Promise<IUserModel | null>;
    getUserByLogin(login: IUserModel['login']): Promise<IUserModel | null>;
    create(dto: ICreateUserModelDTO): Promise<IUserModel>;
    update(dto: IUpdateUserModelDTO): Promise<IUserModel>;
    delete(id: IUserModel['id']): Promise<boolean>;
}
