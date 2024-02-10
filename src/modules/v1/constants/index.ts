const basePath = 'auth' as const;

export const V1RoutesConstants = {
  LOGIN: `/${basePath}/login`,
  SIGNUP: `/${basePath}/signup`,
  USERS: '/users',
  ROOT: '/',
} as const;

export const fetchUsersFields = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;
