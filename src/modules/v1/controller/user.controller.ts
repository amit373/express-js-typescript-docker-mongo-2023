import { type Response, type Request } from 'express';
import { injectable } from 'tsyringe';

import { type IQuery } from '@app/interfaces';
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
   *     responses:
   *       200:
   *         description: success
   */
  fetchUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const users = await this.userService.fetchUsers(req.query as unknown as IQuery);
    this.setSuccessData(users);
    this.sendResponse(req, res);
  });
}
