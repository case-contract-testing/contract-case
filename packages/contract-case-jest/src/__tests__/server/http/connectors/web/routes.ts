import type { ErrorRequestHandler, Express } from 'express';
import type { Dependencies } from '../../domain/types.js';
import { UserNotFoundException } from '../../model/UserNotFoundException.js';
import * as handlers from './handlers.js';

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
  app.get('/users/:userId', handlers.usersByPath(deps));
  app.get('/users', handlers.usersByQuery(deps));

  app.use(errorHandler);
};
