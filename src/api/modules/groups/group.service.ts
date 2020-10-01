import { inject, injectable } from 'inversify';

import { GroupVM } from '~api/modules/groups/group.model';
import {
    ICreateGroupVM,
    IGroupService,
    IGroupVM,
    IUpdateGroupVM
} from '~api/modules/groups/types';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import { IGroupService as IIntegrationGroupService } from '~integration/groups/types';
import { INTEGRATION_TYPES } from '~integration/startup/inversify';

@injectable()
export class GroupService implements IGroupService {
    constructor(
        @inject(INTEGRATION_TYPES.GroupService)
        private groupService: IIntegrationGroupService,
        @inject(LOGGER_TYPE) private logger: ILogger
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
