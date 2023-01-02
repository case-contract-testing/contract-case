import { contractFile } from 'connectors';
import { makeLogger } from 'connectors/logger/consoleLogger';
import type { RunContext } from 'entities/context/types';
import type { ContractDescription } from 'entities/contract/types';

const makeNoContextLogger = (
  runConfig: Partial<RunContext>,
  location: string
) =>
  makeLogger({
    'case:currentRun:context:location': [location],
    'case:currentRun:context:logLevel': runConfig[
      'case:currentRun:context:logLevel'
    ]
      ? runConfig['case:currentRun:context:logLevel']
      : 'info',
  });

export const startContract = (
  description: ContractDescription,
  runConfig: Partial<RunContext> = {}
): Promise<unknown> =>
  Promise.resolve(
    contractFile.beginRecord(
      description,
      makeNoContextLogger(
        {
          ...runConfig,
        },
        'start contract'
      )
    )
  );

export const endContract = (
  runConfig: Partial<RunContext> = {}
): Promise<unknown> =>
  Promise.resolve(
    contractFile.endRecord(makeNoContextLogger(runConfig, 'end contract'))
  );
