const basePath = 'auth';

export const V1RoutesConstants = {
  LOGIN: `/${basePath}/login`,
  SIGNUP: `/${basePath}/signup`,
  ROOT: '/',
} as const;
