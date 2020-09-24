import { Sequelize } from 'sequelize';
import { initUserModel } from './users';
import { initGroupModel } from './groups';

export function initModules(sq: Sequelize): void {
    initUserModel(sq);
    initGroupModel(sq);
}

export * from './users';
export * from './groups';
