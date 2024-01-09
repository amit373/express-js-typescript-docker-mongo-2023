const basePath = 'auth' as const;

export const V1RoutesConstants = {
  LOGIN: `/${basePath}/login`,
  SIGNUP: `/${basePath}/signup`,
  ROOT: '/',
} as const;
