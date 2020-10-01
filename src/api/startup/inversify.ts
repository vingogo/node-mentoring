import { Container } from 'inversify';

import { GroupService } from '~api/modules/groups/group.service';
import { IGroupService } from '~api/modules/groups/types';
import { IUserService } from '~api/modules/users/types';
import { UserService } from '~api/modules/users/user.service';
import { LOGGER_TYPE } from '~common/constants';
import { loggerInstance, ILogger } from '~common/logger';

export const API_TYPES = {
    UserService: Symbol.for('userService'),
    GroupService: Symbol.for('groupService')
} as const;

export function configureDIContainer(container: Container) {
    container.bind<IUserService>(API_TYPES.UserService).to(UserService);
    container.bind<IGroupService>(API_TYPES.GroupService).to(GroupService);
    container.bind<ILogger>(LOGGER_TYPE).toConstantValue(loggerInstance);
}
