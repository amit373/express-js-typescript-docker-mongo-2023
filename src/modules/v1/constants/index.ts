const basePath = 'auth' as const;

export const V1RoutesConstants = {
  LOGIN: `/${basePath}/login`,
  SIGNUP: `/${basePath}/signup`,
  LOGOUT: '/logout',
  ME: '/me',
  FORGOT_PASSWORD: '/forgotPassword',
  RESET_PASSWORD: '/resetPassword/:resetToken',
  USERS: '/users',
  USER_ID: '/users/:id',
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
