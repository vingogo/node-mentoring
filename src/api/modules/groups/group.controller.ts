import { BaseController } from '~api/common/BaseController';
import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { validate } from '~api/common/middlewares/validate';
import { guidIdSchema } from '~api/common/validators/IdSchemas';
import { IdRequestParam } from '~api/common/types/requestParams';
import {
    createGroupSchema,
    updateGroupSchema
} from '~api/modules/groups/group.validators';
import { Params } from 'express-serve-static-core';
import {
    ICreateGroupVM,
    IGroupService,
    IGroupVM,
    IUpdateGroupVM
} from '~api/modules/groups/types';

export class GroupController extends BaseController {
    constructor(
        router: Router,
        logger: Logger,
        private readonly groupService: IGroupService
    ) {
        super('/groups', router, logger);
    }

    protected registerActions() {
        this.get('/', this.getAllGroups);
        this.get('/:id', validate(guidIdSchema, 'params'), this.getGroupById);
        this.post('/', validate(createGroupSchema, 'body'), this.createGroup);
        this.put('/:id', validate(updateGroupSchema, 'body'), this.updateGroup);
        this.delete('/:id', validate(guidIdSchema, 'params'), this.deleteGroup);
    }

    private getAllGroups = async (req: Request, res: Response<IGroupVM[]>) => {
        const groups = await this.groupService.getAll();
        res.json(groups);
    };

    private getGroupById = async (
        req: Request<IdRequestParam>,
        res: Response<IGroupVM>
    ) => {
        const { id } = req.params;
        const group = await this.groupService.getGroup(id);
        res.json(group);
    };

    private createGroup = async (
        req: Request<Params, unknown, ICreateGroupVM>,
        res: Response<IGroupVM['id']>
    ) => {
        const group = req.body;
        const success = await this.groupService.createGroup(group);
        res.json(success);
    };

    private updateGroup = async (
        req: Request<IdRequestParam, unknown, IUpdateGroupVM>,
        res: Response<IGroupVM>
    ) => {
        const group = req.body;
        const response = await this.groupService.updateGroup(group);
        res.json(response);
    };

    private deleteGroup = async (
        req: Request<IdRequestParam>,
        res: Response<boolean>
    ) => {
        const { id } = req.params;
        const response = await this.groupService.deleteGroup(id);
        res.json(response);
    };
}
