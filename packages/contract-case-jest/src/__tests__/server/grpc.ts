import { RunningService, start } from './connectors/grpc/main.js';
import { Dependencies } from './domain/types.js';

export default (dependencies: Dependencies): Promise<RunningService> =>
  start(dependencies);
