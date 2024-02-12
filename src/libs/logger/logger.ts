import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createLogger, format, transports as Transports } from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import { config } from '@app/config';

import { utilities } from './logger.utils';
import { loadEnv, toBool, toNumber } from '@app/utils';

if (!config) loadEnv();

const env = process.env;

const LOGS_DIR = env['LOGS_DIR'];
const APP_NAME = env['APP_NAME'];
const LOG_STORE = toBool(env['LOG_STORE']!);
const LOG_MAX_FILES = toNumber(env['LOG_MAX_FILES']!);

const logDir = join(__dirname, LOGS_DIR!);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const transports = [];
if (LOG_STORE) {
  const commonOptions = {
    level: 'debug',
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%.log',
    maxFiles: LOG_MAX_FILES,
    json: false,
    zippedArchive: true,
  };
  transports.push(new WinstonDaily({ ...commonOptions, dirname: join(logDir, 'debug') }));
  transports.push(new WinstonDaily({ ...commonOptions, dirname: join(logDir, 'error'), handleExceptions: true }));
}

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(info => utilities.format.getFormattedLogs(APP_NAME, info)),
  ),
  transports,
});

logger.add(
  new Transports.Console({
    format: format.combine(
      format.timestamp(),
      format.ms(),
      utilities.format.consoleFormat(APP_NAME, {
        colors: true,
        prettyPrint: true,
      }),
    ),
  }),
);

const stream = {
  write: (message: string): void => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
