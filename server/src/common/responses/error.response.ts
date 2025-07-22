export interface ErrorResponse {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
  timestamp: string;
  path?: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  code: 'VALIDATION_FAILED';
  details: {
    field: string;
    message: string;
    value?: any;
  }[];
} 