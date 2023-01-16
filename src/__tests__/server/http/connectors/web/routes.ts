import type { Express } from 'express';
import type { Dependencies } from '../../domain/types';
import * as handlers from './handlers';

export default (app: Express, deps: Dependencies): void => {
  app.get('/', handlers.base(deps));
  app.get('/health', handlers.health(deps));
  app.get('/users', handlers.users(deps));
};
