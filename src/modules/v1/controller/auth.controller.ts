import { type Response, type Request } from 'express';
import { injectable } from 'tsyringe';

import { type SignupUserDto, type LoginUserDto } from '@app/interfaces';
import { asyncHandler } from '@app/middlewares';
import { Controller } from '@app/utils';
import { AuthService } from '@app/modules/v1/services';
import { HttpStatus } from '@app/constants';

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
   *          - firstName
   *          - lastName
   *          - email
   *          - password
   *      properties:
   *        firstName:
   *          type: string
   *          description: User first name
   *        lastName:
   *          type: string
   *          description: User last name
   *        email:
   *          type: string
   *          description: User email
   *        password:
   *          type: string
   *          description: User password
   */
  signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const createdUser = await this.authService.signup(req.body as SignupUserDto);
    this.setSuccessData(createdUser, 'STATUS.CREATED', HttpStatus.CREATED);
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
   *           $ref: '#/definitions/Login'
   *     responses:
   *       200:
   *         description: success
   * definitions:
   *    Login:
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
    const body = await this.authService.login(req.body as LoginUserDto);
    this.setSuccessData(body);
    this.sendResponse(req, res);
  });
}
