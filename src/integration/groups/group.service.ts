import { inject, injectable } from 'inversify';

import { AppError, ErrorCode } from '~api/common/models/errors/AppError';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import { DATA_ACCESS_TYPES } from '~data-access/constants';
import { IGroupRepository } from '~data-access/modules';
import { IUserGroupRepository } from '~data-access/modules/userGroups';
import {
    ICreateGroupModel,
    ICreateGroupModelResponse,
    IGroupModel,
    IGroupService,
    IUpdateGroupModel,
    IUserGroupService
} from '~integration/groups/types';
import { IUserModel } from '~integration/users/types';

@injectable()
export class GroupService implements IGroupService, IUserGroupService {
    constructor(
        @inject(DATA_ACCESS_TYPES.GroupsRepository)
        private readonly groupRepo: IGroupRepository,
        @inject(DATA_ACCESS_TYPES.UserGroupsRepository)
        private readonly userGroupRepo: IUserGroupRepository,
        @inject(LOGGER_TYPE)
        private readonly logger: ILogger
    ) {}

    async createGroup(
        model: ICreateGroupModel
    ): Promise<ICreateGroupModelResponse> {
        return this.groupRepo.create(model);
    }

    async deleteGroup(id: IGroupModel['id']): Promise<boolean> {
        return this.groupRepo.delete(id);
    }

    async getAllGroups(): Promise<IGroupModel[]> {
        return this.groupRepo.get();
    }

    async getGroupById(id: IGroupModel['id']): Promise<IGroupModel> {
        try {
            const group = await this.groupRepo.getById(id);

            if (!group) {
                throw new AppError('User not found', 404, ErrorCode.DataError);
            }

            return group;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async updateGroup(model: IUpdateGroupModel): Promise<IGroupModel> {
        return this.groupRepo.update(model);
    }

    async addUsersToGroup(
        groupId: IGroupModel['id'],
        userIds: IUserModel['id'][]
    ): Promise<void> {
        try {
            await this.userGroupRepo.addUsersToGroup(groupId, userIds);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
