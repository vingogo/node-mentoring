import {
    ICreateGroupVM,
    IGroupService,
    IGroupVM,
    IUpdateGroupVM
} from '~api/modules/groups/types';
import { IGroupService as IIntegrationGroupService } from '~integration/groups/types';
import { Logger } from 'winston';
import { GroupVM } from '~api/modules/groups/group.model';

export class GroupService implements IGroupService {
    constructor(
        private groupService: IIntegrationGroupService,
        private logger: Logger
    ) {}

    createGroup(group: ICreateGroupVM): Promise<IGroupVM['id']> {
        return this.groupService.createGroup(group).then(({ id }) => id);
    }

    deleteGroup(id: IGroupVM['id']): Promise<boolean> {
        return this.groupService.deleteGroup(id);
    }

    getAll(): Promise<IGroupVM[]> {
        return this.groupService
            .getAllGroups()
            .then((groups) => groups.map((group) => new GroupVM(group)));
    }

    getGroup(id: string): Promise<IGroupVM> {
        return this.groupService
            .getGroupById(id)
            .then((group) => new GroupVM(group));
    }

    updateGroup(groupVm: IUpdateGroupVM): Promise<IGroupVM> {
        return this.groupService
            .updateGroup(groupVm)
            .then((group) => new GroupVM(group));
    }
}
