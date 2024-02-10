import { type Response } from 'express';
import { injectable } from 'tsyringe';

import { asyncHandler } from '@app/middlewares';
import { Controller } from '@app/utils';
import { type IRequest } from '@app/interfaces';

@injectable()
export class IndexController extends Controller {
  /**
   * @swagger
   *
   * /:
   *   get:
   *     tags:
   *      - Health
   *     description: Check server status!
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  index = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    this.setSuccessData();
    this.sendResponse(req, res);
  });
}
