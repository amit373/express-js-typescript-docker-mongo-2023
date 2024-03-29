import { type Response } from 'express';
import { injectable } from 'tsyringe';

import { type SignupUserDto, type LoginUserDto, type IRequest } from '@app/interfaces';
import { asyncHandler } from '@app/middlewares';
import { Controller } from '@app/utils';
import { AuthService } from '@app/modules/v1/services';
import { AUTH_TOKEN, HttpStatus } from '@app/constants';
import { JwtService } from '@app/services';

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
   *         example:
   *           firstName: "John"
   *           lastName: "Doe"
   *           email: "string@gmail.com"
   *           password: "string"
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - apiKey: []
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
  signup = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
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
   *         example:
   *           email: "string@gmail.com"
   *           password: "string"
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - apiKey: []
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
  login = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    // 1. Validate user email and password then generate token.
    const { token, user } = await this.authService.login(req.body as LoginUserDto);

    // 2. Prepare cookies options
    const options = JwtService.getCookieOptions(req);

    // 3. Attach token in request headers and cookies
    res.setHeader(AUTH_TOKEN, token);
    res.cookie(AUTH_TOKEN, token, options);

    // 4. Send token in response.
    this.setSuccessData({ token, user });

    // 5. Return response
    this.sendResponse(req, res);
  });

  /**
   * @swagger
   *
   * /auth/me:
   *   get:
   *     tags:
   *      - Auth
   *     description: Get current user information
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - apiKey: []
   *       - bearerAuth: []
   */
  me = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    this.sendResponse(req, res);
  });

  /**
   * @swagger
   *
   * /auth/forgotPassword:
   *   post:
   *     tags:
   *      - Auth
   *     description: Forgot password to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: user data.
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/ForgotPassword'
   *         example:
   *           email: "string@gmail.com"
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - apiKey: []
   * definitions:
   *    ForgotPassword:
   *      required:
   *          - email
   *      properties:
   *        email:
   *          type: string
   *          description: User email
   */
  forgotPassword = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    this.sendResponse(req, res);
  });

  /**
   * @swagger
   *
   * /auth/resetPassword/:resetToken:
   *   put:
   *     tags:
   *      - Auth
   *     description: Reset password to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: resetToken
   *         description: token received in email.
   *         in: params
   *         required: true
   *       - name: body
   *         description: request body
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/ResetPassword'
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - apiKey: []
   * definitions:
   *    ResetPassword:
   *      required:
   *          - password
   *      properties:
   *        password:
   *          type: string
   *          description: User password
   */
  resetPassword = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    this.sendResponse(req, res);
  });

  /**
   * @swagger
   *
   * /auth/logout:
   *   get:
   *     tags:
   *      - Auth
   *     description: Logout current user information
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - apiKey: []
   *       - bearerAuth: []
   */
  logout = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    this.sendResponse(req, res);
  });
}
