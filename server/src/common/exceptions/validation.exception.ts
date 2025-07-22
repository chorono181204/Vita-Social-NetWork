import { BaseException } from './base.exception';
import { ErrorCode, ErrorMessage } from '../enums/error.enum';

export class ValidationException extends BaseException {
  constructor(details?: any) {
    super(ErrorCode.VALIDATION_FAILED, ErrorMessage.VALIDATION_FAILED, 400, details);
  }
}

export class FieldValidationException extends BaseException {
  constructor(field: string, message: string) {
    super(ErrorCode.VALIDATION_FAILED, ErrorMessage.VALIDATION_FAILED, 400, { 
      field,
      message 
    });
  }
} 