import { BoundaryCrashMessage } from '@contract-case/case-connector';
import { crashPrinter } from './defaultTestPrinter.js';

export const errorHandler = (e: Error): never => {
  switch (e.name) {
    case 'ContractCaseCoreError':
    case 'CaseCoreError':
      crashPrinter(
        BoundaryCrashMessage.CRASH_MESSAGE_START,
        e,
        BoundaryCrashMessage.CRASH_MESSAGE_END,
      );
      throw e;
    default:
      throw e;
  }
};
