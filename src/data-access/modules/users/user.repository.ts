import { inject, injectable } from 'inversify';
import { Op } from 'sequelize';

import { LOGGER_TYPE } from '~common/constants';
import { ILogger } from '~common/logger';
import {
    ICreateUserModelDTO,
    IUpdateUserModelDTO,
    IUserModel,
    IUserRepository
} from '~data-access/modules/users/types';
import { UserModel } from '~data-access/modules/users/user.model';

@injectable()
export class UserRepository implements IUserRepository {
    constructor(@inject(LOGGER_TYPE) private logger: ILogger) {}

    async create(dto: ICreateUserModelDTO): Promise<IUserModel> {
        const entity = await UserModel.create(dto);
        return entity.save();
    }

    async delete(id: string): Promise<boolean> {
        const entity = await UserModel.findOne({
            where: {
                id
            }
        });
        if (!entity) {
            this.logger.info(`user with id ${id} not found while deleting`);
            return false;
        }

        entity.isDeleted = true;
        await entity.save();
        this.logger.info(`user with id ${id} successfully deleted`);

        return true;
    }

    async get(limit: number, substr: string): Promise<IUserModel[]> {
        return UserModel.findAll({
            where: {
                [Op.and]: {
                    login: { [Op.iRegexp]: substr },
                    isDeleted: { [Op.eq]: false }
                }
            },
            attributes: {
                include: ['id', 'login', 'password', 'age', 'isDeleted']
            },
            limit
        });
    }

    async getById(id: string): Promise<IUserModel | null> {
        return UserModel.findOne({
            where: {
                [Op.and]: {
                    id: { [Op.eq]: id },
                    isDeleted: { [Op.eq]: false }
                }
            }
        });
    }

    async update(dto: IUpdateUserModelDTO): Promise<IUserModel> {
        const entity = await UserModel.findOne({
            where: {
                [Op.and]: {
                    id: { [Op.eq]: dto.id },
                    isDeleted: { [Op.eq]: false }
                }
            }
        });
        if (!entity) throw new Error('User not found');
        if (dto.age) entity.age = dto.age;
        // not sure is it ok to change login and password fields?
        if (dto.login) entity.login = dto.login;
        if (dto.password) entity.password = dto.password;

        return entity.save();
    }

    async getUserByLogin(
        login: IUserModel['login']
    ): Promise<IUserModel | null> {
        return UserModel.findOne({
            where: {
                login
            }
        });
    }
}
