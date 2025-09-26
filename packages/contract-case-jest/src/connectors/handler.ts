import { BoundaryCrashMessage } from '@contract-case/case-connector/cjs';
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

export const errorReporter = (e: Error): Error => {
  switch (e.name) {
    case 'ContractCaseCoreError':
    case 'CaseCoreError':
      crashPrinter(
        BoundaryCrashMessage.CRASH_MESSAGE_START,
        e,
        BoundaryCrashMessage.CRASH_MESSAGE_END,
      );
      return e;
    default:
      return e;
  }
};
