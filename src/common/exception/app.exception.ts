import { HttpException } from '@nestjs/common';
import { ErrorCodeType } from './error.code';

export class AppException extends HttpException {
  constructor(
    public readonly errorCode: ErrorCodeType,
    statusCode: number,
    message: string,
  ) {
    super({ errorCode, message }, statusCode);
  }
}
