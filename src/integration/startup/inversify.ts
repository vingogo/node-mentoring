import { Container } from 'inversify';

import { GroupService } from '~integration/groups/group.service';
import { IGroupService, IUserGroupService } from '~integration/groups/types';
import { IUserService } from '~integration/users/types';
import { UserService } from '~integration/users/user.service';

export const INTEGRATION_TYPES = {
    UserService: Symbol.for('BlUserService'),
    GroupService: Symbol.for('BlGroupService'),
    UserGroupService: Symbol.for('BLUserGroupService')
};

export function configureContainer(container: Container) {
    container.bind<IUserService>(INTEGRATION_TYPES.UserService).to(UserService);
    container
        .bind<IGroupService>(INTEGRATION_TYPES.GroupService)
        .to(GroupService);
    container
        .bind<IUserGroupService>(INTEGRATION_TYPES.UserGroupService)
        .to(GroupService);
}
