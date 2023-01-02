import { CaseFailedError } from 'entities/CaseFailedError';
import type { MatchContext } from 'entities/context/types';
import type { CaseExample } from 'entities/contract/types';
import { hasErrors } from './MatchResult';
import type { MatchResult } from './types';

export const handleResult = (
  example: CaseExample,
  exampleIndex: number,
  matchResult: MatchResult,
  context: MatchContext
): void => {
  if (hasErrors(matchResult)) {
    context.logger.debug(`Matching errors present`);
    context.resultPrinter.printFailureTitle(example, exampleIndex);
    matchResult.forEach((e) => {
      context.resultPrinter.printError(e);
    });
    throw new CaseFailedError(matchResult);
  }
  context.resultPrinter.printSuccessTitle(example, exampleIndex);
};
