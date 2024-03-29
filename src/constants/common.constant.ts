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

export const enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

export const roles: Record<string, 'user' | 'admin'> = {
  [Roles.USER]: 'user',
  [Roles.ADMIN]: 'admin',
} as const;

export const AUTH_TOKEN = 'authToken';

export const xApiKey = 'x-api-key';

export const defaultPagination = {
  page: 1,
  limit: 10,
} as const;
