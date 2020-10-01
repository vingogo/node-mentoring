import { IUserModel } from '~integration/users/types';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroupModel {
    id: string;
    name: string;
    permissions: Permission[];
}

export type ICreateGroupModelResponse = Pick<IGroupModel, 'id'>;
export type ICreateGroupModel = Omit<IGroupModel, 'id'>;
export type IUpdateGroupModel = Pick<IGroupModel, 'id'> & Partial<IGroupModel>;

export interface IGroupService {
    getAllGroups(): Promise<IGroupModel[]>;
    getGroupById(id: IGroupModel['id']): Promise<IGroupModel>;
    createGroup(model: ICreateGroupModel): Promise<ICreateGroupModelResponse>;
    updateGroup(model: IUpdateGroupModel): Promise<IGroupModel>;
    deleteGroup(id: IGroupModel['id']): Promise<boolean>;
}

export interface IUserGroupService {
    addUsersToGroup(
        groupId: IGroupModel['id'],
        userIds: IUserModel['id'][]
    ): Promise<void>;
}
