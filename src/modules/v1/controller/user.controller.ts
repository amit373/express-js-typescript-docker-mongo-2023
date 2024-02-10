import { type Response } from 'express';
import { injectable } from 'tsyringe';

import { type IRequest, type IQuery } from '@app/interfaces';
import { asyncHandler } from '@app/middlewares';
import { Controller } from '@app/utils';
import { UserService } from '@app/modules/v1/services';

@injectable()
export class UserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  /**
   * @swagger
   *
   * /users:
   *   get:
   *     tags:
   *      - User
   *     description: Fetch all users
   *     produces:
   *       - application/json
   *     security:
   *       - apiKey: []
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: success
   */
  fetchUsers = asyncHandler(async (req: IRequest<any, any, IQuery>, res: Response): Promise<void> => {
    const users = await this.userService.fetchUsers(req.query);
    this.setSuccessData(users);
    this.sendResponse(req, res);
  });
}
