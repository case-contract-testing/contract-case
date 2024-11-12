import type * as http from 'http';
import start from './connectors/web/index.js';

export default (port: number): Promise<http.Server> => start(port);
