import { getLogger } from '~common/logger';
import { UserRepository } from '~data-access/modules/users';

import { UserService } from './user.service';

export function getUserService() {
    return new UserService(
        new UserRepository(getLogger('UserRepository')),
        getLogger('UserService')
    );
}
