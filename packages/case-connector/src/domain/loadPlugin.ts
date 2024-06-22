import { loadPlugins } from '../connectors/case-boundary/plugins';
import { BoundaryResult, ILogPrinter, IResultPrinter } from '../entities/types';
import { mapConfig } from './config';
import { ContractCaseConnectorConfig } from './types';

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
