import { Router } from 'express';
import { container } from 'tsyringe';

import { UserController } from '@app/modules/v1/controller';
import { V1RoutesConstants } from '@app/modules/v1/constants';

const userController: UserController = container.resolve(UserController);
const userRouter: Router = Router();

userRouter.get(V1RoutesConstants.USERS, userController.fetchUsers);
userRouter.get(V1RoutesConstants.USER_ID, userController.fetchUser);
userRouter.put(V1RoutesConstants.USER_ID, userController.updateUser);
userRouter.delete(V1RoutesConstants.USER_ID, userController.deleteUser);

export { userRouter };
