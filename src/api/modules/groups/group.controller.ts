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

import { validate } from '~api/common/middlewares/validate';
import { guidIdSchema } from '~api/common/validators/IdSchemas';
import {
    createGroupSchema,
    updateGroupSchema
} from '~api/modules/groups/group.validators';
import {
    ICreateGroupVM,
    IGroupService,
    IUpdateGroupVM
} from '~api/modules/groups/types';
import { API_TYPES } from '~api/startup/inversify';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';

@controller('api/groups')
export class GroupController extends BaseHttpController {
    constructor(
        @inject(LOGGER_TYPE) private readonly logger: ILogger,
        @inject(API_TYPES.GroupService)
        private readonly groupService: IGroupService
    ) {
        super();
    }

    @httpGet('/')
    private async getAllGroups() {
        const groups = await this.groupService.getAll();
        return this.json(groups);
    }

    @httpGet('/:id', validate(guidIdSchema, 'params'))
    private async getGroupById(@requestParam() id: string) {
        const group = await this.groupService.getGroup(id);
        return this.json(group);
    }

    @httpPost('/', validate(createGroupSchema, 'body'))
    private async createGroup(@requestBody() group: ICreateGroupVM) {
        const success = await this.groupService.createGroup(group);
        return this.json(success);
    }

    @httpPut('/:id', validate(updateGroupSchema, 'body'))
    private async updateGroup(@requestBody() group: IUpdateGroupVM) {
        const response = await this.groupService.updateGroup(group);
        return this.json(response);
    }

    @httpDelete('/:id', validate(guidIdSchema, 'params'))
    private async deleteGroup(@requestParam() id: string) {
        const response = await this.groupService.deleteGroup(id);
        return this.json(response);
    }
}
