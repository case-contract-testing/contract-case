import type * as http from 'http';
import start from './connectors/web';

export default (): Promise<http.Server> => start();
