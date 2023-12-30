import { Router } from 'express';
import { config } from '@app/config';
import { ApiVersions } from '@app/constants';

import { indexRouter } from './index.route';

const v1Router: Router = Router();

v1Router.use(`${config.app.BASE_URL}/${ApiVersions.V1}`, indexRouter);

export { v1Router };
