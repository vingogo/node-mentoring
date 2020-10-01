import { IGroupVM } from '~api/modules/groups/types';
import { IGroupModel, Permission } from '~integration/groups/types';

export class GroupVM implements IGroupVM {
    id: string;
    name: string;
    permissions: Permission[];

    constructor(group: IGroupModel) {
        this.id = group.id;
        this.name = group.name;
        this.permissions = group.permissions;
    }
}

export const permissions: Permission[] = [
    'READ',
    'WRITE',
    'DELETE',
    'SHARE',
    'UPLOAD_FILES'
];
