export const HTTP_STATUS_CODE_MATCHER_TYPE = 'HttpStatusCode' as const;

export interface CoreHttpStatusCodeMatcher {
  'case:matcher:type': typeof HTTP_STATUS_CODE_MATCHER_TYPE;
  'case:matcher:rule': number | string | Array<number | string>;
  'case:matcher:example': number;
  'case:matcher:resolvesTo': 'HttpStatusCode';
}
