import 'reflect-metadata'; // Don't change order always import first

import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { type Application, type Request } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import i18next from 'i18next';
import i18nextFsBackend from 'i18next-fs-backend';
import { handle as i18nextMiddlewareHandle, LanguageDetector } from 'i18next-http-middleware';
import { container } from 'tsyringe';

import { cors, LoggerService } from '@app/libs';
import { config } from '@app/config';
import { Locale, RoutesConstants } from '@app/constants';
import { NotFoundException } from '@app/exceptions';
import { i18nextConfig } from '@app/locales';
import { errorMiddleware } from '@app/middlewares';
import { v1Router } from '@app/modules/v1';

const loggerService = container.resolve(LoggerService);

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  loggerService.error(`UNCAUGHT EXCEPTION!! ${err?.name}: ${err?.message}`);
  process.exit(1);
});

const app: Application = express();

function initI18Next(): void {
  void i18next.use(LanguageDetector).use(i18nextFsBackend).init(i18nextConfig);
  app.use(i18nextMiddlewareHandle(i18next));
}

function initializeMiddlewares(): void {
  app.use(cors({ origin: config.CORS.ORIGIN, credentials: config.CORS.CREDENTIALS }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: config.EXTENDED }));
  app.use(cookieParser());
  app.use(
    rateLimit({
      max: config.RATE_LIMIT.MAX,
      windowMs: config.RATE_LIMIT.WINDOW__MS,
      message: i18next.t('ERROR.TO_MANY_REQUEST'),
    }),
  );
}

function initializeRoutes(): void {
  app.use(v1Router);
}

function initializeErrorHandling(): void {
  app.all(RoutesConstants.NOT_FOUND, ({ originalUrl, headers }: Request) => {
    void i18next.changeLanguage((headers['lang'] as string) || Locale.EN);
    throw new NotFoundException(i18next.t('ERROR.NOT_FOUND', { message: originalUrl }));
  });
  app.use(errorMiddleware);
}

initI18Next();
initializeMiddlewares();
initializeRoutes();
initializeErrorHandling();

export default app;

// FIXME: mongo sanitize
