import { Sequelize, Model, Optional, DataTypes, UUIDV4 } from 'sequelize';

import { IGroup, Permission } from '~data-access/modules/groups/types';

export class GroupModel extends Model<IGroup, Optional<IGroup, 'id'>> {
    id!: string;
    name!: string;
    permissions!: Permission[];
}

export function initGroupModel(sequelize: Sequelize) {
    GroupModel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            name: { type: DataTypes.STRING, allowNull: false },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'group',
            timestamps: false
        }
    );
}
