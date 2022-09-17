export const JSON_NUMBER_TYPE = 'JsonNumber' as const;
export const JSON_STRING_TYPE = 'JsonString' as const;
export const JSON_NULL_TYPE = 'JsonNull' as const;
export const JSON_EXACT_PRIMITIVE_TYPE = 'JsonExactPrimitive' as const;

export type AnyMatcherType =
  | typeof JSON_NUMBER_TYPE
  | typeof JSON_STRING_TYPE
  | typeof JSON_NULL_TYPE
  | typeof JSON_EXACT_PRIMITIVE_TYPE;

export interface MatchingError {
  message: string;
  expected: unknown;
  actual: unknown;
  toString: () => string;
}
