import {
    ICreateGroupModel,
    ICreateGroupModelResponse,
    IGroupModel,
    IGroupService,
    IUpdateGroupModel
} from '~integration/groups/types';
import { Logger } from 'winston';
import { IGroupRepository } from '~data-access/modules';
import { AppError, ErrorCode } from '~api/common/models/errors/AppError';

export class GroupService implements IGroupService {
    constructor(private groupRepo: IGroupRepository, private logger: Logger) {}

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
}
