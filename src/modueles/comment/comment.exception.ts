import { AppException } from 'src/common/exception/app.exception';
import { ErrorCode } from 'src/common/exception/error.code';

export class CommentNotFoundException extends AppException {
  constructor(message = '존재하지 않는 댓글입니다') {
    super(ErrorCode.COMMENT_NOT_FOUND, 404, message);
  }
}
