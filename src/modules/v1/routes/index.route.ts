import { Router } from 'express';
import { container } from 'tsyringe';

import { IndexController } from '@app/modules/v1/controller';

const indexController: IndexController = container.resolve(IndexController);
const indexRouter: Router = Router();

indexRouter.get('/', indexController.index);

export { indexRouter };
