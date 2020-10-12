import { Container } from 'inversify';

import { AccessService } from '../access/access.service';
import { IAccessService } from '../access/types';
import { GroupService, IGroupService, IUserGroupService } from '../groups';
import { IUserService } from '../users/types';
import { UserService } from '../users/user.service';

export const INTEGRATION_TYPES = {
    UserService: Symbol.for('BlUserService'),
    GroupService: Symbol.for('BlGroupService'),
    UserGroupService: Symbol.for('BLUserGroupService'),
    AccessService: Symbol.for('BLAccessService')
};

export function configureContainer(container: Container): void {
    container.bind<IUserService>(INTEGRATION_TYPES.UserService).to(UserService);
    container
        .bind<IGroupService>(INTEGRATION_TYPES.GroupService)
        .to(GroupService);
    container
        .bind<IUserGroupService>(INTEGRATION_TYPES.UserGroupService)
        .to(GroupService);
    container
        .bind<IAccessService>(INTEGRATION_TYPES.AccessService)
        .to(AccessService);
}
