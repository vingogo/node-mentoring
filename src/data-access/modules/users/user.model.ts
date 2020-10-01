import { createHash } from 'crypto';

import { Model, Sequelize, DataTypes, UUIDV4, Optional } from 'sequelize';

import { IUserModel } from '~data-access/modules/users/types';

export class UserModel extends Model<
    IUserModel,
    Optional<IUserModel, 'id' | 'isDeleted'>
> {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted!: boolean;
}

export function initUserModel(sequelize: Sequelize): void {
    UserModel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            login: { type: DataTypes.STRING, allowNull: false },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(val: string) {
                    this.setDataValue(
                        'password',
                        createHash('md5').update(val).digest('hex')
                    );
                }
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 4, max: 130 }
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'user',
            timestamps: false
        }
    );
}
