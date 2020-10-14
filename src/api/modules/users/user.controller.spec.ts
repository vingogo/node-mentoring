import 'reflect-metadata';
import { cleanUpMetadata, results } from 'inversify-express-utils';

import { ILogger } from '~common/logger';

import { ICreateUserVM, IUserService, IUserVM } from './types';
import { UserController } from './user.controller';

const logger: ILogger = {
    debug: console.log,
    info: console.log,
    warn: console.log,
    error: console.log
} as ILogger;

describe('UserController', () => {
    let controller: UserController;
    beforeEach((done) => {
        cleanUpMetadata();
        done();
    });

    describe('Routing & Request Handling:', () => {
        describe('getAutoSuggestUsers', () => {
            it('should work', async () => {
                controller = new UserController(logger, {
                    async getAutoSuggestUsers(
                        loginSubstring: string,
                        limit: number
                    ): Promise<IUserVM[]> {
                        expect(loginSubstring).toBe('foo');
                        expect(limit).toBe(12);
                        return [];
                    }
                } as IUserService);

                const response = await controller.getUserList('foo', '12');

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toStrictEqual([]);
            });
        });

        describe('getUser', () => {
            const userMock: IUserVM = {
                login: 'foo',
                password: 'bar',
                age: 25,
                id: '123'
            };

            it('should work', async () => {
                controller = new UserController(logger, {
                    async getUser(id): Promise<IUserVM> {
                        expect(id).toBe('123');
                        return userMock;
                    }
                } as IUserService);

                const response = await controller.getUser('123');

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toStrictEqual(userMock);
            });
        });

        describe('createUser', () => {
            const userMock: ICreateUserVM = {
                login: 'foo',
                password: 'bar',
                age: 25
            };

            it('should work', async () => {
                controller = new UserController(logger, {
                    async createUser(vm): Promise<string> {
                        expect(vm).toBe(userMock);
                        return '123';
                    }
                } as IUserService);

                const response = await controller.createUser(userMock);

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toEqual('123');
            });
        });

        describe('updateUser', () => {
            const userMock: IUserVM = {
                login: 'foo',
                password: 'bar',
                age: 25,
                id: '123'
            };

            it('should work', async () => {
                controller = new UserController(logger, {
                    async updateUser(vm): Promise<IUserVM> {
                        expect(vm).toStrictEqual(userMock);
                        return userMock;
                    }
                } as IUserService);

                const response = await controller.updateUser('123', userMock);

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toStrictEqual(userMock);
            });
        });

        describe('deleteUser', () => {
            it('should work', async () => {
                controller = new UserController(logger, {
                    async deleteUser(vm): Promise<boolean> {
                        expect(vm).toBe('123');
                        return true;
                    }
                } as IUserService);

                const response = await controller.deleteUser('123');

                expect(response).toBeInstanceOf(results.JsonResult);
                expect(response.statusCode).toBe(200);
                expect(response.json).toEqual(true);
            });
        });
    });
});
