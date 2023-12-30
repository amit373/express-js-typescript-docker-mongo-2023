import 'reflect-metadata'; // Always import first
import { container } from 'tsyringe';
import { type Server } from 'http';
import { config } from '@app/config';
import { LoggerService } from '@app/libs';

import App from './app';

const loggerService = container.resolve(LoggerService);
let server: Server;

/**
 * Start NodeJS server...
 */
async function bootstrap(): Promise<void> {
  try {
    App.listen(config.app.PORT, () => {
      loggerService.info('Database connected 🔥');
      loggerService.info(`🚀 Server listening on port ${config.app.PORT} ENV: ${config.app.NODE_ENV} mode...`, {
        controller: 'server.ts',
        function: 'bootstrap',
      });
    });
  } catch (error: any) {
    handleStartupError(error);
  }
}

/**
 * Handle startup errors.
 * @param {Error} error
 */
function handleStartupError(error: any): void {
  loggerService.error(`Database not connected: ${error?.message}`, {
    controller: 'server.ts',
    function: 'bootstrap',
  });
  process.exit(1);
}

/**
 * Handle Signal and unknown errors.
 * @param {String} event
 * @param {any} payload
 * @param {'error' | 'code' | 'signal'} type
 */
function handleShutDownError(event: string, payload: any, type: 'error' | 'code' | 'signal'): void {
  console.log(`👋 ${event?.toUpperCase()} RECEIVED. Shutting down gracefully`);
  if (type === 'error' && payload) {
    const errorMessage = `${event.toUpperCase()}! ${payload?.name}: ${payload?.message}`;
    loggerService.info(errorMessage, { controller: 'server.ts [Root]', function: 'handleShutDownError' });
    loggerService.error(errorMessage);
  }
  server?.close(() => {
    console.log('💥 Process terminated!');
    process.exit(type === 'code' ? (payload as number) : 1);
  });
}

// Register event handlers
process.on('exit', (code: number) => {
  handleShutDownError('exit', code, 'code');
});
['SIGINT', 'SIGUSR1', 'SIGTERM', 'SIGQUIT'].forEach(signal =>
  process.on(signal, (s: NodeJS.Signals) => {
    handleShutDownError(signal, s, 'signal');
  }),
);
process.on('unhandledRejection', (reason: unknown) => {
  handleShutDownError('unhandledRejection', reason, 'error');
});

// Start the server
void bootstrap();
