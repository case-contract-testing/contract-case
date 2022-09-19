export const JSON_SERIALISABLE_NUMBER_TYPE = 'JsonSerialisableNumber' as const;
export const JSON_SERIALISABLE_STRING_TYPE = 'JsonSerialisableString' as const;
export const JSON_SERIALISABLE_NULL_TYPE = 'JsonSerialisableNull' as const;
export const JSON_SERIALISABLE_BOOLEAN_TYPE =
  'JsonSerialisableBoolean' as const;
export const JSON_EXACT_PRIMITIVE_TYPE = 'JsonExactPrimitive' as const;

export type AnyMatcherType =
  | typeof JSON_SERIALISABLE_NUMBER_TYPE
  | typeof JSON_SERIALISABLE_STRING_TYPE
  | typeof JSON_SERIALISABLE_NULL_TYPE
  | typeof JSON_SERIALISABLE_BOOLEAN_TYPE
  | typeof JSON_EXACT_PRIMITIVE_TYPE;

export interface MatchingError {
  message: string;
  expected: unknown;
  actual: unknown;
  toString: () => string;
}
