import {
  CaseConfigurationError,
  CaseFailedAssertionError,
} from '../../entities';
import type { MatchContext } from '../../entities/context/types';
import type { CaseExample } from '../../entities/contract/types';
import {
  ERROR_TYPE_CONFIGURATION,
  ERROR_TYPE_MATCHING,
  ERROR_TYPE_RAW_MATCH,
  ERROR_TYPE_TEST_RESPONSE,
  VerificationError,
} from './types';

export const handleResult = (
  example: CaseExample,
  exampleIndex: string,
  context: MatchContext,
): void => {
  if (example.result === 'FAILED') {
    context.resultPrinter.printFailureTitle(example, exampleIndex, context);
    example.errors.forEach((e) => {
      context.resultPrinter.printError(e, context);
    });
    // Warning: **ALL** error types must be checked in this function

    if (
      example.errors.some(
        (i) =>
          i.type === ERROR_TYPE_MATCHING || i.type === ERROR_TYPE_RAW_MATCH,
      )
    ) {
      context.logger.debug(`Matching errors present`);
      if (context['_case:currentRun:context:throwOnFail']) {
        context.logger.maintainerDebug(
          `Throwing a CaseFailedAssertionError with`,
          example.errors,
        );
        throw new CaseFailedAssertionError(example.errors);
      } else {
        context.logger.maintainerDebug(
          `Not erroring because throwOnFail is false`,
        );
      }
    }
    const verificationError: VerificationError | undefined =
      example.errors.find((i) => i.type === ERROR_TYPE_TEST_RESPONSE) as
        | VerificationError
        | undefined;
    if (verificationError && context['_case:currentRun:context:throwOnFail']) {
      throw verificationError.error;
    }

    if (example.errors.some((i) => i.type === ERROR_TYPE_CONFIGURATION)) {
      throw new CaseConfigurationError(
        example.errors.map((e) => e.message).join(),
      );
    }
  } else {
    context.resultPrinter.printSuccessTitle(example, exampleIndex, context);
  }
};
