export const ErrorCode = {
  // Common
  BAD_REQUEST: 'COMMON_001',
  NOT_FOUND: 'COMMON_002',
  INTERNAL_SERVER_ERROR: 'COMMON_003',

  // User
  USER_NOT_FOUND: 'U001',

  // Post
  POST_NOT_FOUND: 'P001',

  // Comment
  COMMENT_NOT_FOUND: 'C001',

  // Follow
  ALREADY_FOLLOWING: 'F001',
  NOT_FOLLOWING: 'F002',
  CANNOT_FOLLOW_SELF: 'F003',
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];
