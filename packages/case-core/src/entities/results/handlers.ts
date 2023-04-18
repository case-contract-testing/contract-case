import {
  CaseConfigurationError,
  CaseFailedAssertionError,
} from '../../entities';
import type { MatchContext } from '../../entities/context/types';
import type { CaseExample } from '../../entities/contract/types';
import {
  ERROR_TYPE_EXECUTION,
  ERROR_TYPE_MATCHING,
  ERROR_TYPE_RAW_MATCH,
  ERROR_TYPE_TEST_RESPONSE,
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
    // Warning: **ALL** error types must be checked in this function

    if (
      example.errors.some(
        (i) => i.type === ERROR_TYPE_MATCHING || i.type === ERROR_TYPE_RAW_MATCH
      )
    ) {
      context.logger.debug(`Matching errors present`);
      if (context['_case:currentRun:context:throwOnFail']) {
        throw new CaseFailedAssertionError(example.errors);
      }
    }
    const verificationError: VerificationError | undefined =
      example.errors.find((i) => i.type === ERROR_TYPE_TEST_RESPONSE) as
        | VerificationError
        | undefined;
    if (verificationError && context['_case:currentRun:context:throwOnFail']) {
      throw verificationError.error;
    }

    if (example.errors.some((i) => i.type === ERROR_TYPE_EXECUTION)) {
      throw new CaseConfigurationError(
        example.errors.map((e) => e.message).join()
      );
    }
  } else {
    context.resultPrinter.printSuccessTitle(example, exampleIndex, context);
  }
};
