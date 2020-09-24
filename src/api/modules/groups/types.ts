import { IGroupModel } from '~integration/groups/types';

export type IGroupVM = IGroupModel;
export type ICreateGroupVM = Omit<IGroupVM, 'id'>;
export type IUpdateGroupVM = Pick<IGroupVM, 'id'> &
    Partial<Omit<IGroupVM, 'id'>>;

export interface IGroupService {
    getAll(): Promise<IGroupVM[]>;

    getGroup(id: string): Promise<IGroupVM>;

    createGroup(group: ICreateGroupVM): Promise<IGroupVM['id']>;

    updateGroup(group: IUpdateGroupVM): Promise<IGroupVM>;

    deleteGroup(id: IGroupVM['id']): Promise<boolean>;
}
