import { ErrorCode, ErrorMessage } from '../enums/error.enum';

export abstract class BaseException extends Error {
  constructor(
    public readonly errorCode: ErrorCode,
    public readonly errorMessage: ErrorMessage,
    public readonly statusCode: number = 400,
    public readonly details?: any
  ) {
    super(errorMessage);
    this.name = this.constructor.name;
  }

  get code(): string {
    return this.errorCode;
  }

  get message(): string {
    return this.errorMessage;
  }
} 