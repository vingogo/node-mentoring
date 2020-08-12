export enum ErrorCode {
    DataError,
    Unknown
}

export class AppError extends Error {
    constructor(
        message: string,
        public httpCode: number = 400,
        public code: ErrorCode = ErrorCode.Unknown
    ) {
        super(message);
    }
}
