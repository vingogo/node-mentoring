import { Container } from 'inversify';
import { Sequelize } from 'sequelize';

import { DATA_ACCESS_TYPES, SEQUELIZE_TYPE } from '~data-access/constants';
import {
    GroupRepository,
    IGroupRepository,
    IUserRepository,
    UserRepository
} from '~data-access/modules';
import { UserGroupsRepository } from '~data-access/modules/userGroups/userGroups.repository';

import { IUserGroupRepository } from '../modules/userGroups';

export function configureContainer(container: Container, sq: Sequelize) {
    container.bind<Sequelize>(SEQUELIZE_TYPE).toConstantValue(sq);
    container
        .bind<IGroupRepository>(DATA_ACCESS_TYPES.GroupsRepository)
        .to(GroupRepository);
    container
        .bind<IUserGroupRepository>(DATA_ACCESS_TYPES.UserGroupsRepository)
        .to(UserGroupsRepository);
    container
        .bind<IUserRepository>(DATA_ACCESS_TYPES.UserRepository)
        .to(UserRepository);
}
