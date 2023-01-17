import { CaseFailedError } from 'entities/CaseFailedError';
import type { MatchContext } from 'entities/context/types';
import type { CaseExample } from 'entities/contract/types';
import { hasErrors } from './MatchResult';
import type { MatchResult } from './types';

export const handleResult = (
  example: CaseExample,
  exampleIndex: string,
  matchResult: MatchResult,
  context: MatchContext
): void => {
  if (hasErrors(matchResult)) {
    context.logger.debug(`Matching errors present`);
    context.resultPrinter.printFailureTitle(example, exampleIndex, context);
    matchResult.forEach((e) => {
      context.resultPrinter.printError(e, context);
    });
    throw new CaseFailedError(matchResult);
  }
  context.resultPrinter.printSuccessTitle(example, exampleIndex, context);
};
