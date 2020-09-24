import { Router } from 'express';
import { GroupController } from '~api/modules/groups/group.controller';
import { getLogger } from '~common/logger';
import { GroupService } from '~api/modules/groups/group.service';
import { getGroupService } from '~integration/groups';

export function init(router: Router): GroupController {
    return new GroupController(
        router,
        getLogger('GroupController'),
        new GroupService(getGroupService(), getLogger('API GroupService'))
    );
}
