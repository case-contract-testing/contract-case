import { CaseConfigurationError, CaseFailedAssertionError } from 'entities';
import type { MatchContext } from 'entities/context/types';
import type { CaseExample } from 'entities/contract/types';
import {
  ERROR_TYPE_MATCHING,
  ERROR_TYPE_VERIFICATION,
  VerificationError,
} from './types';

export const handleResult = (
  example: CaseExample,
  exampleIndex: string,
  context: MatchContext
): void => {
  if (example.result === 'FAILED') {
    context.resultPrinter.printFailureTitle(example, exampleIndex, context);
    example.errors.forEach((e) => {
      context.resultPrinter.printError(e, context);
    });

    if (example.errors.some((i) => i.type === ERROR_TYPE_MATCHING)) {
      context.logger.debug(`Matching errors present`);
      throw new CaseFailedAssertionError(example.errors);
    }
    const verificationError: VerificationError | undefined =
      example.errors.find((i) => i.type === ERROR_TYPE_VERIFICATION) as
        | VerificationError
        | undefined;
    if (verificationError) {
      throw verificationError.error;
    }

    throw new CaseConfigurationError(
      example.errors.map((e) => e.message).join()
    );
  }
  context.resultPrinter.printSuccessTitle(example, exampleIndex, context);
};
