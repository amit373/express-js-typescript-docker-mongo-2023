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
   *     parameters:
   *       - name: page
   *         description: page number
   *         in: query
   *         type: number
   *         required: false
   *       - name: limit
   *         description: page limit
   *         in: query
   *         type: number
   *         required: false
   *       - name: searchKey
   *         description: searchKey for search results
   *         in: query
   *         type: string
   *         required: false
   *       - name: searchFields
   *         description: searchFields for search results for multiple fields pass comma separated values
   *         in: query
   *         type: string
   *         required: false
   *       - name: sort
   *         description: sort add multiple comma separated and -createdAt for descending and createdAt for ascending
   *         in: query
   *         type: string
   *         required: false
   *       - name: fields
   *         description:  firstName,lastName,email,createdAt,updatedAt as comma separated if multiple fields
   *         in: query
   *         type: string
   *         required: false
   *       - name: totalCount
   *         description: totalCount
   *         in: query
   *         type: boolean
   *         required: false
   *     responses:
   *       200:
   *         description: success
   */
  fetchUsers = asyncHandler(async (req: IRequest<any, any, IQuery>, res: Response): Promise<void> => {
    const users = await this.userService.fetchUsers(req.query);
    this.setSuccessData(users);
    this.sendResponse(req, res);
  });

  /**
   * @swagger
   *
   * /users/:id:
   *   get:
   *     tags:
   *      - User
   *     description: Fetch user by id
   *     produces:
   *       - application/json
   *     security:
   *       - apiKey: []
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         description: user id
   *         in: params
   *         type: number
   *         required: true
   *     responses:
   *       200:
   *         description: success
   */
  fetchUser = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    this.sendResponse(req, res);
  });

  /**
   * @swagger
   *
   * /users/:id:
   *   put:
   *     tags:
   *      - User
   *     description: Update user by id
   *     produces:
   *       - application/json
   *     security:
   *       - apiKey: []
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         description: user id
   *         in: params
   *         type: number
   *         required: true
   *       - name: body
   *         description: user data.
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/UpdateUser'
   *     responses:
   *       200:
   *         description: success
   * definitions:
   *    UpdateUser:
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
  updateUser = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    this.sendResponse(req, res);
  });

  /**
   * @swagger
   *
   * /users/:id:
   *   delete:
   *     tags:
   *      - User
   *     description: Delete user by id
   *     produces:
   *       - application/json
   *     security:
   *       - apiKey: []
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         description: user id
   *         in: params
   *         type: number
   *         required: true
   *     responses:
   *       200:
   *         description: success
   */
  deleteUser = asyncHandler(async (req: IRequest, res: Response): Promise<void> => {
    this.sendResponse(req, res);
  });
}
