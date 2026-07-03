import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppException } from './app.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const errorCode =
      exception instanceof AppException
        ? exception.errorCode
        : `COMMON_${statusCode}`;

    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as Record<string, unknown>).message ??
          exception.message);

    response.status(statusCode).json({
      success: false,
      error: {
        statusCode,
        errorCode,
        message,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
