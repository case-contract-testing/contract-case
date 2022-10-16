import type { Express } from 'express';
import * as handlers from './handlers';

export default (app: Express): void => {
  app.get('/', handlers.base);
};
