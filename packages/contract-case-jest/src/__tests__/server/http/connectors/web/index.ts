import express from 'express';
import type * as http from 'http';
import bodyParser from 'body-parser';
import { baseService } from '../../domain/baseService';
import routes from './routes';
import { healthService } from '../../domain/healthService';
import type { Dependencies } from '../../domain/types';
import { userRepo } from '../users/defaultUserRepository';

const app = express();
const PORT = 8282; // default port to listen

const defaultDependencies: Dependencies = {
  baseService,
  healthService,
  userRepository: userRepo,
};

const start = (
  port = PORT,
  dependencies = defaultDependencies
): Promise<http.Server> =>
  new Promise((resolve, reject) => {
    try {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      routes(app, dependencies);
      const server = app.listen(port, '::');
      server.on('listening', () => {
        resolve(server);
      });
    } catch (e) {
      reject(e);
    }
  });

export default start;
