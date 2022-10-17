import express from 'express';
import type * as http from 'http';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = 8080; // default port to listen

const start = (): http.Server => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  routes(app);
  const server = app.listen(PORT);
  return server;
};

export default start;
