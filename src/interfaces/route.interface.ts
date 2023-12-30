import { type Request, type Response, type NextFunction } from 'express';

export type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IRoute {
  method: IMethod;
  path: string;
  function: (req: Request, res: Response, next: NextFunction) => void;
  middlewares: any[];
}
