import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = 8080; // default port to listen

const start = (): void => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  routes(app);
  app.listen(PORT);
  console.info(`Listening on ${PORT}`);
};

export default start;
