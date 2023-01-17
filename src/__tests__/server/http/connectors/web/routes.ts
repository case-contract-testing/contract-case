import type { ErrorRequestHandler, Express } from 'express';
import type { Dependencies } from '../../domain/types';
import { UserNotFoundException } from '../../model/UserNotFoundException';
import * as handlers from './handlers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  if (err instanceof UserNotFoundException) {
    res.status(404).send(err.message);
  }
  res.status(500).send('Something broke!');
};

export default (app: Express, deps: Dependencies): void => {
  app.get('/', handlers.base(deps));
  app.get('/health', handlers.health(deps));
  app.get('/users/:userId', handlers.users(deps));

  app.use(errorHandler);
};
