import { type Response, type Request } from 'express';
import { injectable } from 'tsyringe';

import { asyncHandler } from '@app/middlewares';
import { Controller } from '@app/utils';
import { type CreateUserDto } from '@app/interfaces';
import { AuthService } from '../services';

@injectable()
export class AuthController extends Controller {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * @swagger
   *
   * /auth/signup:
   *   post:
   *     tags:
   *      - Auth
   *     description: Signup to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: user data.
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Signup'
   *     responses:
   *       200:
   *         description: success
   * definitions:
   *    Signup:
   *      required:
   *          - email
   *          - password
   *      properties:
   *        email:
   *          type: string
   *          description: User email
   *        password:
   *          type: string
   *          description: User password
   */
  signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    this.setResponseData();

    const body = await this.authService.signup(req.body as CreateUserDto);
    this.setSuccessData(body);

    this.sendResponse(req, res);
  });

  /**
   * @swagger
   *
   * /auth/login:
   *   post:
   *     tags:
   *      - Auth
   *     description: Login to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: user data.
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Signup'
   *     responses:
   *       200:
   *         description: success
   * definitions:
   *    Signup:
   *      required:
   *          - email
   *          - password
   *      properties:
   *        email:
   *          type: string
   *          description: User email
   *        password:
   *          type: string
   *          description: User password
   */
  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    this.setResponseData();

    const body = await this.authService.login(req.body as CreateUserDto);
    this.setSuccessData(body);

    this.sendResponse(req, res);
  });
}
