import { ErrorCode, ErrorMessage } from '../enums/error.enum';

export class AppException extends Error {
  constructor(
    public readonly errorCode: ErrorCode,
    public readonly errorMessage: string,
    public readonly statusCode: number = 400,
    public readonly details?: any
  ) {
    super(errorMessage);
    this.name = 'AppException';
  }

  get code(): string {
    return this.errorCode;
  }

  get message(): string {
    return this.errorMessage;
  }
} 