import { GroupModel, UserModel } from '~data-access/modules';

export interface IUserGroups {
    userId: string;
    groupId: string;
}

export interface IUserGroupRepository {
    addUsersToGroup(
        groupId: GroupModel['id'],
        userIds: UserModel['id'][]
    ): Promise<boolean>;
}
