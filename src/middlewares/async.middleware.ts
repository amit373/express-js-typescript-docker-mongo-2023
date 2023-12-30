import { type NextFunction, type Request, type Response } from 'express';

export const asyncHandler =
  (fn: any) =>
  (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
