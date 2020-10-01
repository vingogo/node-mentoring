import joi from '@hapi/joi';

import { permissions } from '~api/modules/groups/group.model';
import { ICreateGroupVM, IUpdateGroupVM } from '~api/modules/groups/types';

export const createGroupSchema = joi.object<ICreateGroupVM>().keys({
    name: joi.string().required(),
    permissions: joi
        .array()
        .required()
        .items(joi.string().valid(...permissions))
});

export const updateGroupSchema = joi.object<IUpdateGroupVM>().keys({
    id: joi.string().uuid({ version: 'uuidv4' }).required(),
    name: joi.string(),
    permissions: joi.array().items(joi.string().valid(...permissions))
});
