import type * as http from 'http';
import start from './connectors/web/index.js';

export default (): Promise<http.Server> => start();
