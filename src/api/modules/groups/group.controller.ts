import { inject } from 'inversify';
import {
    BaseHttpController,
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    requestBody,
    requestParam
} from 'inversify-express-utils';

import { log } from '~api/common/decorators/log';
import { validate } from '~api/common/middlewares/validate';
import { guidIdSchema } from '~api/common/validators/IdSchemas';
import {
    createGroupSchema,
    updateGroupSchema,
    userIdsSchema
} from '~api/modules/groups/group.validators';
import {
    ICreateGroupVM,
    IGroupService,
    IGroupVM,
    IUpdateGroupVM
} from '~api/modules/groups/types';
import { IUserVM } from '~api/modules/users/types';
import { API_TYPES } from '~api/startup/inversify';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import { IUserGroupService } from '~integration/groups';
import { INTEGRATION_TYPES } from '~integration/startup/inversify';

@controller('/groups', API_TYPES.LogMiddleware)
export class GroupController extends BaseHttpController {
    constructor(
        @inject(LOGGER_TYPE) private readonly logger: ILogger,
        @inject(API_TYPES.GroupService)
        private readonly groupService: IGroupService,
        @inject(INTEGRATION_TYPES.UserGroupService)
        private readonly userGroupService: IUserGroupService
    ) {
        super();
    }

    @log
    @httpGet('/')
    private async getAllGroups() {
        const groups = await this.groupService.getAll();
        return this.json(groups);
    }

    @log
    @httpGet('/:id', validate(guidIdSchema, 'params'))
    private async getGroupById(@requestParam('id') id: string) {
        const group = await this.groupService.getGroup(id);
        return this.json(group);
    }

    @log
    @httpPost('/', validate(createGroupSchema, 'body'))
    private async createGroup(@requestBody() group: ICreateGroupVM) {
        const success = await this.groupService.createGroup(group);
        return this.json(success);
    }

    @log
    @httpPut('/:id', validate(updateGroupSchema, 'body'))
    private async updateGroup(@requestBody() group: IUpdateGroupVM) {
        const response = await this.groupService.updateGroup(group);
        return this.json(response);
    }

    @log
    @httpDelete('/:id', validate(guidIdSchema, 'params'))
    private async deleteGroup(@requestParam('id') id: string) {
        const response = await this.groupService.deleteGroup(id);
        return this.json(response);
    }

    @log
    @httpPut(
        '/:id/users',
        validate(guidIdSchema, 'params'),
        validate(userIdsSchema, 'body')
    )
    private async addUsersToGroup(
        @requestParam('id') groupId: IGroupVM['id'],
        @requestBody() userIds: IUserVM['id'][]
    ) {
        await this.userGroupService.addUsersToGroup(groupId, userIds);
        return this.ok();
    }
}
