import { UsersController } from './users.controller';
import { userService } from '../../../services/user.service';
import { getLogger } from '../../../startup/logger';
import { Router } from 'express';

export function init(router: Router): UsersController {
    return new UsersController(
        router,
        getLogger('UsersController'),
        userService
    );
}
