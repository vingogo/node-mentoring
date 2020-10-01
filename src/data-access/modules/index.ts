import { Sequelize } from 'sequelize';

import { initGroupModel } from './groups';
import { initUserGroupsModel } from './userGroups';
import { initUserModel } from './users';

export function initModules(sq: Sequelize): void {
    initUserModel(sq);
    initGroupModel(sq);
    initUserGroupsModel(sq);
}

export * from './users';
export * from './groups';
