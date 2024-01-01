import { getEnv, loadEnv } from '@app/utils';
import { config } from '@app/config';

if (!config) loadEnv();

export default {
  FORMAT: 'dev',
  DIR: (getEnv('LOG_DIR') as string) || '../../logs',
  MAX_FILES: (getEnv('LOG_MAX_FILES', { toNumber: true }) as number) || 30,
  LOG_STORE: (getEnv('LOG_STORE', { toBool: true }) as boolean) || false,
  NO_COLOR: false,
} as const;
