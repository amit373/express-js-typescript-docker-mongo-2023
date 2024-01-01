import app from './app.config';
import db from './db.config';
import logs from './logs.config';

export const config = {
  ...app,
  ...db,
  ...logs,
} as const;
