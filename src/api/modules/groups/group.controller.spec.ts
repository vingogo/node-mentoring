import 'reflect-metadata';
import { cleanUpMetadata, results } from 'inversify-express-utils';

import { ILogger } from '~common/logger';
import { IGroupModel, IUserGroupService } from '~integration/groups';
import { IUserModel } from '~integration/users/types';

import { GroupController } from './group.controller';
import {
    IGroupVM,
    ICreateGroupVM,
    IUpdateGroupVM,
    IGroupService
} from './types';

const logger: ILogger = {
    debug: console.log,
    info: console.log,
    warn: console.log,
    error: console.log
} as ILogger;

describe('UserController', () => {
    let controller: GroupController;
    beforeEach((done) => {
        cleanUpMetadata();
        done();
    });

    describe('Routing & Request Handling:', () => {
        describe('getAllGroups', () => {
            it('should work', async () => {
                controller = new GroupController(
                    logger,
                    {
                        async getAll(): Promise<IGroupVM[]> {
                            return [];
                        }
                    } as IGroupService,
                    {} as IUserGroupService
                );

                const response = await controller.getAllGroups();

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toStrictEqual([]);
            });
        });

        describe('getGroup', () => {
            const groupMock: IGroupVM = {
                id: '123',
                permissions: ['READ'],
                name: 'test'
            };

            it('should work', async () => {
                controller = new GroupController(
                    logger,
                    {
                        async getGroup(id): Promise<IGroupVM> {
                            expect(id).toBe('123');
                            return groupMock;
                        }
                    } as IGroupService,
                    {} as IUserGroupService
                );

                const response = await controller.getGroupById('123');

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toStrictEqual(groupMock);
            });
        });

        describe('createGroup', () => {
            const groupMock: ICreateGroupVM = {
                name: 'foo',
                permissions: []
            };

            it('should work', async () => {
                controller = new GroupController(
                    logger,
                    {
                        async createGroup(vm): Promise<string> {
                            expect(vm).toBe(groupMock);
                            return '123';
                        }
                    } as IGroupService,
                    {} as IUserGroupService
                );

                const response = await controller.createGroup(groupMock);

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toEqual('123');
            });
        });

        describe('updateGroup', () => {
            const groupMock: IUpdateGroupVM = {
                permissions: ['DELETE'],
                name: 'bar',
                id: '123'
            };

            it('should work', async () => {
                controller = new GroupController(
                    logger,
                    {
                        async updateGroup(vm): Promise<IGroupVM> {
                            expect(vm).toStrictEqual(groupMock);
                            return groupMock as IGroupVM;
                        }
                    } as IGroupService,
                    {} as IUserGroupService
                );

                const response = await controller.updateGroup(groupMock);

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toStrictEqual(groupMock);
            });
        });

        describe('deleteUser', () => {
            it('should work', async () => {
                controller = new GroupController(
                    logger,
                    {
                        async deleteGroup(vm): Promise<boolean> {
                            expect(vm).toBe('123');
                            return true;
                        }
                    } as IGroupService,
                    {} as IUserGroupService
                );

                const response = await controller.deleteGroup('123');

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toEqual(true);
            });
        });

        describe('addUsersToGroup', () => {
            it('should work', async () => {
                controller = new GroupController(
                    logger,
                    {} as IGroupService,
                    {
                        async addUsersToGroup(
                            groupId: IGroupModel['id'],
                            userIds: IUserModel['id'][]
                        ): Promise<void> {
                            expect(groupId).toBe('123');
                            expect(userIds).toStrictEqual(['456', '789']);
                        }
                    } as IUserGroupService
                );

                const response = await controller.addUsersToGroup('123', [
                    '456',
                    '789'
                ]);
                expect(response).toBeInstanceOf(results.OkResult);
            });
        });
    });
});
