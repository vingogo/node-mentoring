import { GroupService } from './group.service';
import { GroupRepository } from '~data-access/modules';
import { getLogger } from '~common/logger';

export function getGroupService() {
    return new GroupService(
        new GroupRepository(getLogger('GroupRepository')),
        getLogger('GroupService')
    );
}
