import { contractFile } from 'connectors';
import { loggerWithoutContext } from 'connectors/logger/consoleLogger';
import type { ContractDescription } from 'entities/contract/types';

export const startContract = (
  description: ContractDescription
): Promise<unknown> =>
  Promise.resolve(contractFile.beginRecord(description, loggerWithoutContext));
