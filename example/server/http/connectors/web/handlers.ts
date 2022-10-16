import { RequestHandler, Response, Request } from 'express';
import responder from './responder';
import baseService from '../../domain/baseService';

export const base: RequestHandler = (req: Request, res: Response) => {
  responder(res).success(baseService(req.ip));
};

export default base;
