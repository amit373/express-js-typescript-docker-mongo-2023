export const HttpMessage = {
  OK: 'Ok',
  CREATED: 'Created',
  ACCEPTED: 'Accepted',
  NO_CONTENT: 'No content',
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  CONFLICT: 'Conflict',
  UNPROCESSABLE_ENTITY: 'Unprocessable entity',
  TOO_MANY_REQUESTS: 'Too many requests',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  NOT_IMPLEMENTED: 'Not implemented',
  BAD_GATEWAY: 'Bad gateway',
  SERVICE_UNAVAILABLE: 'Service unavailable',
  GATEWAY_TIMEOUT: 'Gateway timeout',
} as const;

export const ErrorMessage = {
  SERVER_HEALTH: 'Server is Up Ready to Rock!',
  SOMETHING_WENT_WRONG: 'Something Went wrong!',
  INVALID_TOKEN: 'Invalid token. Please log in again!',
  TOKEN_EXPIRED: 'Your token has expired! Please log in again.',
  PERMISSION_DENIED: 'You do not have permission to perform this action',
  NOT_LOGGED_IN: 'You are not logged in! Please log in to get access.',
  USER_WITH_TOKEN_NOT_EXIST: 'The user belonging to this token does no longer exist.',
  UNCAUGHT_EXCEPTION: 'UNCAUGHT EXCEPTION! 💥 Shutting down...',
  UNCAUGHT_REJECTION: 'UNCAUGHT REJECTION! 💥 Shutting down...',
  SIGTERM: 'SIGTERM signal received: closing HTTP server',
  ALREADY_EXIST: 'Already exist',
  RECENTLY_CHANGED_PASSWORD: 'User recently changed password! Please log in again.',
  TO_MANY_REQUEST: 'Too many requests from this IP, please try again in an hour!',
  ONLY_IMAGES_ALLOWED: 'Not an image! Please upload only images.',
} as const;

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const Locale = {
  EN: 'en',
  HI: 'hi',
} as const;

export const ApiVersions = {
  V1: 'v1',
} as const;
