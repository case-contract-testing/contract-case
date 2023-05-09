import { BoundaryCrashMessage } from '@contract-case/case-boundary';
import {
  CaseConfigurationError,
  BrokerError,
  CaseCoreError,
} from '@contract-case/case-core';

export const handleError = (e: Error): never => {
  switch (e.name) {
    case CaseConfigurationError.name:
      console.error(
        `ContractCase was configured incorrectly: \n\n    ${e.message}\n\nThis is probably a misconfiguration.`
      );
      break;
    case BrokerError.name:
      console.error(`Failed while contacting broker:\n\n     ${e.message}`);
      break;
    case CaseCoreError.name:
    default:
      console.error(
        `${BoundaryCrashMessage.CRASH_MESSAGE_START}\n${e.message}\n${BoundaryCrashMessage.CRASH_MESSAGE_END}`
      );
  }
  process.exit(1);
};
