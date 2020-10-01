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
    ): Promise<void> {
        const records = userIds.map((userId) => ({
            groupId,
            userId
        }));
        this.logger.debug(`records to insert ${JSON.stringify(records)}`);

        await this.sequelize.transaction(async (transaction) => {
            await UserGroupsModel.bulkCreate(records, {
                transaction,
                returning: true
            });
        });
    }
}
