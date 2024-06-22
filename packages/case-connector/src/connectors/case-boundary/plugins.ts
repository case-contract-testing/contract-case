import {
  BoundaryResult,
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
} from './internals/index.js';
import { BoundaryPluginLoader } from './internals/BoundaryPluginLoader.js';

export const loadPlugins = (
  config: Omit<ContractCaseBoundaryConfig, 'testRunId'>,
  callbackPrinter: ILogPrinter,
  resultPrinter: IResultPrinter,
  callerVersions: string[],
  pluginModuleNames: string[],
): Promise<BoundaryResult> =>
  new BoundaryPluginLoader(
    config,
    callbackPrinter,
    resultPrinter,
    callerVersions,
  ).loadPlugins(pluginModuleNames);
