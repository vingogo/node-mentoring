export enum ErrorCode {
    DataError,
    ValidationError,
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

    toString() {
        return `Code: ${this.code}; HTTP: ${this.httpCode}; ${this.message}`;
    }
}
