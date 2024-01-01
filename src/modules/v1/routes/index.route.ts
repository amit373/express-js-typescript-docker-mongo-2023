import { Router } from 'express';
import { container } from 'tsyringe';

import { IndexController } from '@app/modules/v1/controller';
import { V1RoutesConstants } from '@app/modules/v1/constants';

const indexController: IndexController = container.resolve(IndexController);
const indexRouter: Router = Router();

indexRouter.get(V1RoutesConstants.ROOT, indexController.index);

export { indexRouter };
