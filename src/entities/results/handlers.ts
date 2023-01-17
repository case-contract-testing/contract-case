import { CaseFailedError } from 'entities/CaseFailedError';
import type { MatchContext } from 'entities/context/types';
import type { CaseExample } from 'entities/contract/types';
import { hasErrors } from './MatchResult';
import { ERROR_TYPE_MATCHING, MatchResult } from './types';

export const handleResult = (
  example: CaseExample,
  exampleIndex: string,
  matchResult: MatchResult,
  context: MatchContext
): void => {
  if (hasErrors(matchResult)) {
    context.resultPrinter.printFailureTitle(example, exampleIndex, context);
    matchResult.forEach((e) => {
      context.resultPrinter.printError(e, context);
    });

    if (matchResult.some((i) => i.type === ERROR_TYPE_MATCHING)) {
      context.logger.debug(`Matching errors present`);
      throw new CaseFailedError(matchResult);
    }
  }
  context.resultPrinter.printSuccessTitle(example, exampleIndex, context);
};
