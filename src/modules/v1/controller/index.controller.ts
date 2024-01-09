import { type Request, type Response } from 'express';
import { injectable } from 'tsyringe';

import { asyncHandler } from '@app/middlewares';
import { Controller } from '@app/utils';

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
  index = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    this.setSuccessData();
    this.sendResponse(req, res);
  });
}
