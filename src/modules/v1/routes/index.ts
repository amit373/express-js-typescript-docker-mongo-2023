import { Router } from 'express';

import { config } from '@app/config';
import { ApiVersions, Roles } from '@app/constants';
import { apiKeyMiddleware, setLanguage, restrictTo, authMiddleware } from '@app/middlewares';
import { swaggerSpecsV1, swaggerDefinition } from '@app/modules/v1';
import { setupSwaggerMiddleware } from '@app/utils';

import { indexRouter } from './index.route';
import { authRouter } from './auth.route';
import { userRouter } from './user.route';

const v1Router: Router = Router();

const basePath = `${config.BASE_URL}/${ApiVersions.V1}` as const;

v1Router.use(basePath, [setLanguage], indexRouter);
v1Router.use(basePath, [setLanguage, apiKeyMiddleware], authRouter);
v1Router.use(basePath, [setLanguage, apiKeyMiddleware, authMiddleware, restrictTo(Roles.USER, Roles.ADMIN)], userRouter);

setupSwaggerMiddleware(v1Router, `${config.SWAGGER_URL}/${ApiVersions.V1}`, swaggerDefinition, swaggerSpecsV1);

export { v1Router };
