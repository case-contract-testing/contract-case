import { loadPlugins } from '../connectors/case-boundary/plugins.js';
import { BoundaryResult, ILogPrinter, IResultPrinter } from '../entities/types.js';
import { mapConfig } from './config.js';
import { ContractCaseConnectorConfig } from './types.js';

export const loadPlugin = (
  config: ContractCaseConnectorConfig,
  callbackPrinter: ILogPrinter,
  resultPrinter: IResultPrinter,
  callerVersions: string[],
  moduleNames: string[],
): Promise<BoundaryResult> =>
  Promise.resolve().then(() =>
    loadPlugins(
      mapConfig(config, 'loadConfig'),
      callbackPrinter,
      resultPrinter,
      callerVersions,
      moduleNames,
    ),
  );
