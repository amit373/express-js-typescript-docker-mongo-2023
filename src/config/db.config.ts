import { getEnv, loadEnv } from '@app/utils';
import { config } from '@app/config';

if (!config) loadEnv();

export default {
  DB_HOST: getEnv('DB_HOST') as string,
  DB_PORT: getEnv('DB_PORT', { toNumber: true }) as number,
  DB_DATABASE: getEnv('DB_DATABASE') as string,
} as const;
