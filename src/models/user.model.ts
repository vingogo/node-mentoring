import { IUserModel, IUserVM } from '../interfaces/IUser';

export class UserVM implements IUserVM {
    age: number;
    id: string;
    login: string;
    password: string;
    constructor(user: IUserModel) {
        this.age = user.age;
        this.id = user.id;
        this.login = user.login;
        this.password = user.password;
    }
}
