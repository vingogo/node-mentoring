import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize';

import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import { SEQUELIZE_TYPE } from '~data-access/constants';
import { GroupModel, UserModel } from '~data-access/modules';
import { IUserGroupRepository } from '~data-access/modules/userGroups/types';
import { UserGroupsModel } from '~data-access/modules/userGroups/userGroups.model';

@injectable()
export class UserGroupsRepository implements IUserGroupRepository {
    constructor(
        @inject(SEQUELIZE_TYPE) private sequelize: Sequelize,
        @inject(LOGGER_TYPE) private logger: ILogger
    ) {}

    async addUsersToGroup(
        groupId: GroupModel['id'],
        userIds: UserModel['id'][]
    ): Promise<boolean> {
        return this.sequelize
            .transaction(async (transaction) => {
                await UserGroupsModel.bulkCreate(
                    userIds.map((userId) => ({
                        userId,
                        groupId
                    })),
                    {
                        transaction
                    }
                );
            })
            .then(
                () => true,
                () => false
            );
    }
}
