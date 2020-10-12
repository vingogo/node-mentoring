export const API_TYPES = {
    UserService: Symbol.for('userService'),
    GroupService: Symbol.for('groupService'),
    LogMiddleware: Symbol.for('logMiddleware'),
    AuthorizeMiddleware: Symbol.for('authorizeMiddleware'),
    AccessService: Symbol.for('accessService'),
    TokenManager: Symbol.for('tokenManager')
} as const;
