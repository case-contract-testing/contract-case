import express from 'express';
import type * as http from 'http';
import bodyParser from 'body-parser';
import routes from './routes.js';
import { userRepo } from '../../domain/users/defaultUserRepository.js';
import { baseService } from '../../domain/baseService.js';
import { healthService } from '../../domain/healthService.js';
import { Dependencies } from '../../domain/types.js';

const app = express();
const PORT = 8282; // default port to listen

const defaultDependencies: Dependencies = {
  baseService,
  healthService,
  userRepository: userRepo,
};

const start = (
  port = PORT,
  dependencies = defaultDependencies,
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
