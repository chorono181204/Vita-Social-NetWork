import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { GraphQLError } from 'graphql';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError[], host: ArgumentsHost) {
    const errors = this.flattenValidationErrors(exception);
    
    return new GraphQLError('Validation failed', {
      extensions: {
        code: 'VALIDATION_FAILED',
        errors,
      },
    });
  }

  private flattenValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = [];
    
    errors.forEach(error => {
      if (error.constraints) {
        Object.values(error.constraints).forEach(message => {
          messages.push(message);
        });
      }
      
      if (error.children) {
        messages.push(...this.flattenValidationErrors(error.children));
      }
    });
    
    return messages;
  }
} 