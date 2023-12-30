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
import swaggerUi from 'swagger-ui-express';
import { container } from 'tsyringe';

import { cors, LoggerService } from '@app/libs';
import { config } from '@app/config';
import { ApiVersions, Locale, RoutesConstants } from '@app/constants';
import { NotFoundException } from '@app/exceptions';
import { i18nextConfig } from '@app/locales';
import { errorMiddleware } from '@app/middlewares';
import { swaggerSpecsV1, v1Router } from '@app/modules/v1';

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
  app.use(cors({ origin: config.app.CORS.ORIGIN, credentials: config.app.CORS.CREDENTIALS }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: config.app.EXTENDED }));
  app.use(cookieParser());
  app.use(
    rateLimit({
      max: config.app.RATE_LIMIT.MAX,
      windowMs: config.app.RATE_LIMIT.WINDOW__MS,
      message: i18next.t('ERROR.TO_MANY_REQUEST'),
    }),
  );
}

function initializeRoutes(): void {
  app.use(v1Router);
}

function initializeSwagger(): void {
  app.use(`${config.app.SWAGGER_URL}/${ApiVersions.V1}`, swaggerUi.serve, swaggerUi.setup(swaggerSpecsV1));
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
initializeSwagger();
initializeErrorHandling();

export default app;
