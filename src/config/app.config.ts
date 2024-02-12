import { NodeEnv } from '@app/interfaces';
import { getEnv, loadEnv } from '@app/utils';
import { config } from '@app/config';

if (!config) loadEnv();

export default {
  APP_NAME: (getEnv('APP_NAME') as string) || 'ExpressJS',
  PORT: getEnv('PORT', { toNumber: true }) as number,
  NODE_ENV: getEnv('NODE_ENV'),
  isDevelopment: getEnv('NODE_ENV') === NodeEnv.DEVELOPMENT,
  logPayloadInLogger: true,
  BASE_URL: '/api',
  SWAGGER_URL: '/api-docs',
  NO_COLOR: getEnv('NO_COLOR', {
    toBool: true,
  }) as boolean,
  CORS: {
    ORIGIN: '*',
    CREDENTIALS: true,
  },
  RATE_LIMIT: {
    MAX: 100,
    WINDOW__MS: 60 * 60 * 1000,
  },
  EXTENDED: true,
  JWT: {
    JWT_SECRET: getEnv('JWT_SECRET') as string,
    EXPIRES_IN: getEnv('JWT_EXPIRES_IN') as string,
  },
  HASH: {
    SALT: 10,
    ROUNDS: 16,
  },
  API_KEY: 'V37Z8VF48P6UZJ855B',
} as const;
