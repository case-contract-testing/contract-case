import { BoundaryCrashMessage } from '@contract-case/case-boundary';
import { crashPrinter } from './defaultTestPrinter';

export const errorHandler = (e: Error): never => {
  switch (e.name) {
    case 'ContractCaseCoreError':
    case 'CaseCoreError':
      crashPrinter(
        BoundaryCrashMessage.CRASH_MESSAGE_START,
        e,
        BoundaryCrashMessage.CRASH_MESSAGE_END
      );
      throw e;
    default:
      throw e;
  }
};
