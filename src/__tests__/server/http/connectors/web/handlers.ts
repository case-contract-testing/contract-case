import type { RequestHandler, Response, Request } from 'express';
import baseService from '__tests__/server/http/domain/baseService';
import responder from './responder';

export const base: RequestHandler = (req: Request, res: Response) => {
  responder(res).success(baseService(req.ip));
};

export const health: RequestHandler = (_req: Request, res: Response) => {
  responder(res).success({ status: 'up' });
};
