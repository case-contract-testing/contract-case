import {
  MatchContext,
  TriggerError,
  ERROR_TYPE_TRIGGER,
  CaseTriggerError,
  ERROR_TYPE_MATCHING,
  ERROR_TYPE_RAW_MATCH,
  CaseFailedAssertionError,
  VerificationError,
  ERROR_TYPE_TEST_RESPONSE,
  ERROR_TYPE_CONFIGURATION,
  CaseConfigurationError,
} from '@contract-case/case-plugin-base';
// TODO: Move the "core" types back into the core package
// They're only in the base, because of the result printer type on the context
// eslint-disable-next-line no-restricted-imports
import { CaseExample } from '@contract-case/case-plugin-base/dist/src/core/contract/types';

export const handleResult = (
  example: CaseExample,
  exampleIndex: string,
  context: MatchContext,
): void => {
  context.logger.deepMaintainerDebug('Handling a result of', example);
  if (example.result === 'FAILED') {
    context.logger.deepMaintainerDebug(
      `Printing a failure title for`,
      example,
      exampleIndex,
      context,
    );
    context.resultPrinter.printFailureTitle(example, exampleIndex, context);
    example.errors.forEach((e) => {
      context.resultPrinter.printError(e, context);
    });
    // Warning: **ALL** error types must be checked in this function

    const triggerError: TriggerError | undefined = example.errors.find(
      (i) => i.type === ERROR_TYPE_TRIGGER,
    ) as TriggerError | undefined;

    if (triggerError) {
      throw new CaseTriggerError(
        `The provided trigger function failed during execution:\n\n   ${triggerError.message}`,
        {
          '_case:currentRun:context:location': triggerError.location,
        },
      );
    }
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
