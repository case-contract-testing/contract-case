import type * as http from 'http';
import start from './connectors/web';

export default (port: number): Promise<http.Server> => start(port);
