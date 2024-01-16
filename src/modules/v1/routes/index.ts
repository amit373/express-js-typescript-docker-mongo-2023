import { Router } from 'express';
import { serve as swaggerUiServe, setup as swaggerUiSetup } from 'swagger-ui-express';

import { config } from '@app/config';
import { ApiVersions } from '@app/constants';
import { setLanguage } from '@app/middlewares';
import { swaggerSpecsV1 } from '@app/modules/v1';

import { indexRouter } from './index.route';
import { authRouter } from './auth.route';
import { userRouter } from './user.route';

const v1Router: Router = Router();

const basePath = `${config.BASE_URL}/${ApiVersions.V1}` as const;

v1Router.use(basePath, [setLanguage], indexRouter);
v1Router.use(basePath, [setLanguage], authRouter);
v1Router.use(basePath, [setLanguage], userRouter);
v1Router.use(`${config.SWAGGER_URL}/${ApiVersions.V1}`, swaggerUiServe, swaggerUiSetup(swaggerSpecsV1));

export { v1Router };
