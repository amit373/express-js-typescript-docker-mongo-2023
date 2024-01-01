import { Router } from 'express';
import { container } from 'tsyringe';

import { AuthController } from '@app/modules/v1/controller';
import { loginValidation, signupValidation } from '@app/modules/v1/validation';
import { V1RoutesConstants } from '@app/modules/v1/constants';

import { validate } from '@app/middlewares';

const authController: AuthController = container.resolve(AuthController);
const authRouter: Router = Router();

authRouter.post(
  V1RoutesConstants.LOGIN,
  [
    validate(loginValidation, {
      body: true,
    }),
  ],
  authController.login,
);

authRouter.post(
  V1RoutesConstants.SIGNUP,
  [
    validate(signupValidation, {
      body: true,
    }),
  ],
  authController.signup,
);

export { authRouter };
