import { UserService } from './user.service';
import { UserRepository } from '~data-access/modules/users';
import { getLogger } from '~common/logger';

export function getUserService() {
    return new UserService(
        new UserRepository(getLogger('UserRepository')),
        getLogger('UserService')
    );
}
