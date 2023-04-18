import type { RequestHandler, Response, Request } from 'express';
import type {
  BaseServiceDependencies,
  HealthServiceDependencies,
  UserServiceDependencies,
} from '../../domain/types';
import { makeUserService } from '../../domain/userService';
import type { User } from '../../model/responses';
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

export const usersByPath: (deps: UserServiceDependencies) => RequestHandler =
  ({ userRepository }: UserServiceDependencies) =>
  (req: Request, res: Response) => {
    const { userId } = req.params;
    if (typeof userId !== 'string') throw new Error('No userID provided');
    responder(res).success<User>(
      makeUserService({ userRepository }).getUser(userId)
    );
  };

export const usersByQuery: (deps: UserServiceDependencies) => RequestHandler =
  ({ userRepository }: UserServiceDependencies) =>
  (req: Request, res: Response) => {
    const { id } = req.query;
    if (typeof id !== 'string') throw new Error('No userID provided');
    responder(res).success<User>(
      makeUserService({ userRepository }).getUser(id)
    );
  };
