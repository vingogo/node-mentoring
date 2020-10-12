import { Container } from 'inversify';

import { LogRequestMiddleware } from '~api/common/middlewares/logRequest';
import {
    AccessService,
    AuthorizeMiddleware,
    IAccessService,
    ITokenManager,
    TokenManager
} from '~api/modules/access/';
import { GroupService, IGroupService } from '~api/modules/groups';
import { IUserService, UserService } from '~api/modules/users';
import { API_TYPES } from '~api/startup/constants';
import { LOGGER_TYPE } from '~common/constants';
import { ILogger, loggerInstance } from '~common/logger';

export function configureDIContainer(container: Container): void {
    container.bind<IUserService>(API_TYPES.UserService).to(UserService);
    container.bind<IGroupService>(API_TYPES.GroupService).to(GroupService);
    container.bind<ILogger>(LOGGER_TYPE).toConstantValue(loggerInstance);
    container.bind<IAccessService>(API_TYPES.AccessService).to(AccessService);
    container.bind<ITokenManager>(API_TYPES.TokenManager).to(TokenManager);

    container
        .bind<LogRequestMiddleware>(API_TYPES.LogMiddleware)
        .to(LogRequestMiddleware);
    container
        .bind<AuthorizeMiddleware>(API_TYPES.AuthorizeMiddleware)
        .to(AuthorizeMiddleware);
}
