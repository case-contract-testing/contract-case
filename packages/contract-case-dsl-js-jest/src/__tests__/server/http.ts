import type * as http from 'http';
import start from './connectors/http/index.js';
import { Dependencies } from './domain/types.js';

export default (
  port: number,
  dependencies: Dependencies,
): Promise<http.Server> => start(port, dependencies);
