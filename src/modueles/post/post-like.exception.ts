import { AppException } from 'src/common/exception/app.exception';
import { ErrorCode } from 'src/common/exception/error.code';

export class AlreadyLikedException extends AppException {
  constructor() {
    super(ErrorCode.ALREADY_LIKED, 400, '이미 좋아요한 게시글입니다');
  }
}

export class NotLikedException extends AppException {
  constructor() {
    super(ErrorCode.NOT_LIKED, 400, '좋아요하지 않은 게시글입니다');
  }
}
