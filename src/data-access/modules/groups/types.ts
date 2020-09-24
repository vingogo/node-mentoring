export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroup {
    id: string;
    name: string;
    permissions: Permission[];
}

export type ICreateGroupDTO = Omit<IGroup, 'id'>;
export type IUpdateGroupDTO = Pick<IGroup, 'id'> & Partial<ICreateGroupDTO>;

export interface IGroupRepository {
    get(): Promise<IGroup[]>;
    getById(id: IGroup['id']): Promise<IGroup | null>;
    create(dto: ICreateGroupDTO): Promise<IGroup>;
    update(dto: IUpdateGroupDTO): Promise<IGroup>;
    delete(id: IGroup['id']): Promise<boolean>;
}
