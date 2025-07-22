import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { BaseException, AppException } from '../exceptions';
import { ErrorResponse } from '../responses/error.response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    
    let errorResponse: ErrorResponse;

    if (exception instanceof BaseException || exception instanceof AppException) {
      // Handle custom exceptions
      errorResponse = {
        message: exception.message,
        code: exception.code,
        statusCode: exception.statusCode,
        details: exception.details,
        timestamp: new Date().toISOString(),
        path: context?.req?.url,
      };
    } else if (exception instanceof HttpException) {
      // Handle NestJS HTTP exceptions
      const response = exception.getResponse();
      let message = (response as any).message || exception.message;
      let details = null;
      
      if (Array.isArray(message)) {
        // Validation errors - multiple messages
        details = message;
        message = message[0]; // Use first message as main message
      } else if (typeof response === 'object' && (response as any).message) {
        // Single validation error
        message = (response as any).message;
        details = (response as any).error || null;
      }

      errorResponse = {
        message,
        code: this.getErrorCode(exception.getStatus()),
        statusCode: exception.getStatus(),
        details,
        timestamp: new Date().toISOString(),
        path: context?.req?.url,
      };
    } else {
      // Handle unknown exceptions
      this.logger.error('Unhandled exception:', exception);
      
      errorResponse = {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: context?.req?.url,
      };
    }

    // Log error for debugging
    this.logger.error(`Exception: ${errorResponse.message}`, {
      code: errorResponse.code,
      statusCode: errorResponse.statusCode,
      path: errorResponse.path,
    });

    return new GraphQLError(errorResponse.message, {
      extensions: {
        code: errorResponse.code,
        statusCode: errorResponse.statusCode,
        details: errorResponse.details,
        timestamp: errorResponse.timestamp,
      },
    });
  }

  private getErrorCode(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'BAD_REQUEST';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      case 422:
        return 'UNPROCESSABLE_ENTITY';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'UNKNOWN_ERROR';
    }
  }
} 