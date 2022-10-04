import {
  CoreHttpStatusCodeMatcher,
  HTTP_STATUS_CODE_MATCHER_TYPE,
} from './types';
import { validateCodes } from './validator';

export const httpStatusCodeMatcher = (
  codes: number | string | Array<number | string>,
  example?: number
): CoreHttpStatusCodeMatcher => {
  const impliedExample = validateCodes(codes);
  return {
    'case:matcher:type': HTTP_STATUS_CODE_MATCHER_TYPE,
    'case:matcher:example': example ?? impliedExample,
    'case:matcher:rule': codes,
    'case:matcher:resolvesTo': 'HttpStatusCode',
  };
};
