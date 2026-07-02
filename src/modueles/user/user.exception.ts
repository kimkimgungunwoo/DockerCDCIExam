import { AppException } from 'src/common/exception/app.exception';
import { ErrorCode } from 'src/common/exception/error.code';

export class UserNotFoundException extends AppException {
  constructor(message = '존재하지 않는 유저입니다') {
    super(ErrorCode.USER_NOT_FOUND, 404, message);
  }
}
