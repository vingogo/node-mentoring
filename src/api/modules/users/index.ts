import { UserController } from './user.controller';
import { Router } from 'express';
import { getLogger } from '~common/logger';
import { UserService } from '~api/modules/users/user.service';
import { getUserService } from '~integration/users';

export function init(router: Router): UserController {
    return new UserController(
        router,
        getLogger('UsersController'),
        new UserService(getUserService(), getLogger('API UserService'))
    );
}
