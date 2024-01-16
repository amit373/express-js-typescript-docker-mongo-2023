import { Router } from 'express';
import { serve as swaggerUiServe, setup as swaggerUiSetup } from 'swagger-ui-express';

import { config } from '@app/config';
import { ApiVersions, Roles } from '@app/constants';
import { apiKeyMiddleware, setLanguage, restrictTo, authMiddleware } from '@app/middlewares';
import { swaggerSpecsV1 } from '@app/modules/v1';

import { indexRouter } from './index.route';
import { authRouter } from './auth.route';
import { userRouter } from './user.route';

const v1Router: Router = Router();

const basePath = `${config.BASE_URL}/${ApiVersions.V1}` as const;

const defaultMiddleware = [setLanguage, apiKeyMiddleware];

v1Router.use(basePath, [setLanguage], indexRouter);
v1Router.use(basePath, defaultMiddleware, authRouter);
v1Router.use(basePath, [setLanguage, apiKeyMiddleware, authMiddleware, restrictTo(Roles.USER, Roles.ADMIN)], userRouter);
v1Router.use(`${config.SWAGGER_URL}/${ApiVersions.V1}`, swaggerUiServe, swaggerUiSetup(swaggerSpecsV1));

export { v1Router };
