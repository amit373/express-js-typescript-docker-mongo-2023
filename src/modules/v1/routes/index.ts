import { Router } from 'express';
import { config } from '@app/config';
import { ApiVersions } from '@app/constants';
import { setLanguage } from '@app/middlewares';

import { indexRouter } from './index.route';
import { authRouter } from './auth.route';

const v1Router: Router = Router();

const basePath: string = `${config.BASE_URL}/${ApiVersions.V1}`;

v1Router.use(basePath, [setLanguage], indexRouter);
v1Router.use(basePath, [setLanguage], authRouter);

export { v1Router };
