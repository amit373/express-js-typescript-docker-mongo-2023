import { NodeEnv } from '@app/interfaces';
import { getEnv, loadEnv } from '@app/utils';

loadEnv();

export default {
  APP_NAME: 'ExpressJS',
  PORT: getEnv('PORT', { toNumber: true }) as number,
  NODE_ENV: getEnv('NODE_ENV'),
  isDevelopment: getEnv('NODE_ENV') === NodeEnv.DEVELOPMENT,
  BASE_URL: '/api',
  SWAGGER_URL: '/api-docs',
  NO_COLOR: getEnv('NO_COLOR', {
    toBool: true,
  }) as boolean,
  CORS: {
    ORIGIN: '*',
    CREDENTIALS: true,
  },
  LOGS: {
    FORMAT: 'dev',
    DIR: '../../logs',
  },
  RATE_LIMIT: {
    MAX: 100,
    WINDOW__MS: 60 * 60 * 1000,
  },
  EXTENDED: true,
} as const;
