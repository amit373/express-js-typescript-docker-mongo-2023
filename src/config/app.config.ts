import { NodeEnv } from '@app/interfaces';
import { getEnv, loadEnv } from '@app/utils';
import { config } from '@app/config';

if (!config) loadEnv();

export default {
  APP_NAME: (getEnv('APP_NAME') as string) || 'ExpressJS',
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
  // LOGS: {
  //   FORMAT: 'dev',
  //   DIR: (getEnv('LOG_DIR') as string) || '../../logs',
  //   MAX_FILES: (getEnv('LOG_MAX_FILES', { toNumber: true }) as number) || 30,
  //   LOG_STORE: (getEnv('LOG_STORE', { toBool: true }) as boolean) || false,
  // },
  RATE_LIMIT: {
    MAX: 100,
    WINDOW__MS: 60 * 60 * 1000,
  },
  EXTENDED: true,
} as const;
