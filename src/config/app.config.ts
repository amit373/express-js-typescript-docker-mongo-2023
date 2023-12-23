import { getEnv, loadEnv } from '@app/utils';

loadEnv();

export default {
  APP_NAME: 'ExpressJS',
  NODE_ENV: getEnv('NODE_ENV'),
  PORT: getEnv('PORT', { toNumber: true }) as number,
  BASE_URL: '/api/v1',
  SWAGGER_URL: '/api-docs',
  NO_COLOR: getEnv('NO_COLOR', {
    toBool: true,
  }) as boolean,
  LOGS_DIR: getEnv('LOGS_DIR') as string,
} as const;
