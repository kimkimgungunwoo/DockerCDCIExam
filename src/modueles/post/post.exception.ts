import { AppException } from 'src/common/exception/app.exception';
import { ErrorCode } from 'src/common/exception/error.code';

export class PostNotFoundException extends AppException {
  constructor(message = '존재하지 않는 포스트입니다') {
    super(ErrorCode.POST_NOT_FOUND, 404, message);
  }
}
