export const DATA_ACCESS_TYPES = {
    GroupsRepository: Symbol.for('GroupsRepository'),
    UserGroupsRepository: Symbol.for('UserGroupsRepository'),
    UserRepository: Symbol.for('UserRepository')
} as const;

export const SEQUELIZE_TYPE = Symbol.for('Sequelize');
