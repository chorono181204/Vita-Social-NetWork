export enum ErrorMessage {
  // Auth Errors
  INVALID_CREDENTIALS = 'Invalid email or password',
  ACCOUNT_DEACTIVATED = 'Account is deactivated',
  TOKEN_EXPIRED = 'Token has expired',
  UNAUTHORIZED_ACCESS = 'Unauthorized access',
  
  // User Errors
  USER_NOT_FOUND = 'User not found',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
  USERNAME_ALREADY_EXISTS = 'Username already exists',
  
  // Validation Errors
  VALIDATION_FAILED = 'Validation failed',
  FIELD_REQUIRED = 'Field is required',
  INVALID_EMAIL = 'Invalid email format',
  PASSWORD_TOO_SHORT = 'Password must be at least 6 characters',
  
  // General Errors
  INTERNAL_SERVER_ERROR = 'Internal server error',
  NOT_FOUND = 'Resource not found',
  CONFLICT = 'Resource conflict',
}

export enum ErrorCode {
  // Auth Errors
  INVALID_CREDENTIALS = 'AUTH_001',
  ACCOUNT_DEACTIVATED = 'AUTH_002',
  TOKEN_EXPIRED = 'AUTH_003',
  UNAUTHORIZED_ACCESS = 'AUTH_004',
  
  // User Errors
  USER_NOT_FOUND = 'USER_001',
  EMAIL_ALREADY_EXISTS = 'USER_002',
  USERNAME_ALREADY_EXISTS = 'USER_003',
  
  // Validation Errors
  VALIDATION_FAILED = 'VAL_001',
  FIELD_REQUIRED = 'VAL_002',
  INVALID_EMAIL = 'VAL_003',
  PASSWORD_TOO_SHORT = 'VAL_004',
  
  // General Errors
  INTERNAL_SERVER_ERROR = 'SYS_001',
  NOT_FOUND = 'SYS_002',
  CONFLICT = 'SYS_003',
} 