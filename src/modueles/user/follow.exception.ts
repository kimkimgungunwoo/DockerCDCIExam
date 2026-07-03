import { AppException } from 'src/common/exception/app.exception';
import { ErrorCode } from 'src/common/exception/error.code';

export class AlreadyFollowingException extends AppException {
  constructor() {
    super(ErrorCode.ALREADY_FOLLOWING, 400, '이미 팔로우 중인 유저입니다');
  }
}

export class NotFollowingException extends AppException {
  constructor() {
    super(ErrorCode.NOT_FOLLOWING, 400, '팔로우 중이지 않은 유저입니다');
  }
}

export class CannotFollowSelfException extends AppException {
  constructor() {
    super(
      ErrorCode.CANNOT_FOLLOW_SELF,
      400,
      '자기 자신을 팔로우할 수 없습니다',
    );
  }
}
