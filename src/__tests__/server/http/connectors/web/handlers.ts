import type { RequestHandler, Response, Request } from 'express';
import type {
  BaseServiceDependencies,
  HealthServiceDependencies,
} from '../../domain/types';
import responder from './responder';

export const base: (deps: BaseServiceDependencies) => RequestHandler =
  ({ baseService }: BaseServiceDependencies) =>
  (req: Request, res: Response) => {
    responder(res).success(baseService(req.ip));
  };

type HealthStatus = 'up' | 'down' | 'starting';

type HealthResponse = { status: HealthStatus };

export const health: (deps: HealthServiceDependencies) => RequestHandler =
  ({ healthService }: HealthServiceDependencies) =>
  (_req: Request, res: Response) => {
    if (healthService.ready()) {
      responder(res).success<HealthResponse>({ status: 'up' });
    } else {
      responder(res).status<HealthResponse>(503, { status: 'down' });
    }
  };
