import { Sequelize, Model, DataTypes } from 'sequelize';

import { GroupModel, UserModel } from '~data-access/modules';
import { IUserGroups } from '~data-access/modules/userGroups/types';

export class UserGroupsModel extends Model<IUserGroups> {
    userId!: string;
    groupId!: string;
}

export function initUserGroupsModel(sequelize: Sequelize) {
    UserGroupsModel.init(
        {
            userId: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            groupId: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            }
        },
        {
            sequelize,
            modelName: 'userGroups',
            timestamps: false
        }
    );
    UserModel.belongsToMany(GroupModel, {
        through: UserGroupsModel as typeof Model
    });
    GroupModel.belongsToMany(UserModel, {
        through: UserGroupsModel as typeof Model
    });
}
