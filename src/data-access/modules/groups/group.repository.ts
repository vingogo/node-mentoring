import {
    ICreateGroupDTO,
    IGroup,
    IGroupRepository,
    IUpdateGroupDTO
} from './types';
import { Logger } from 'winston';
import { Op } from 'sequelize';
import { GroupModel } from '~data-access/modules/groups/group.model';

export class GroupRepository implements IGroupRepository {
    constructor(private logger: Logger) {}

    async create(dto: ICreateGroupDTO): Promise<IGroup> {
        const entity = await GroupModel.create(dto);
        return entity.save();
    }

    async delete(id: IGroup['id']): Promise<boolean> {
        const entity = await GroupModel.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        return (
            entity?.destroy().then(
                () => true,
                () => false
            ) ?? false
        );
    }

    async get(): Promise<IGroup[]> {
        return GroupModel.findAll();
    }

    async getById(id: IGroup['id']): Promise<IGroup | null> {
        return GroupModel.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }

    async update(dto: IUpdateGroupDTO): Promise<IGroup> {
        const entity = await GroupModel.findOne({
            where: {
                id: {
                    [Op.eq]: dto.id
                }
            }
        });
        if (!entity) throw new Error('Group not found');
        if (dto.name) entity.name = dto.name;
        if (dto.permissions) entity.permissions = dto.permissions;
        return entity.save();
    }
}
