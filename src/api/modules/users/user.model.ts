import { IUserModel } from '~integration/users/types';

import { IUserVM } from './types';

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
