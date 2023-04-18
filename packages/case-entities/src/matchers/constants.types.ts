import {
  HTTP_STATUS_CODE_MATCHER_TYPE,
  HTTP_REQUEST_MATCHER_TYPE,
  HTTP_RESPONSE_MATCHER_TYPE,
  URL_ENCODED_STRING_TYPE,
  HTTP_BASIC_AUTH_TYPE,
} from './http/constants.types';

/* Parameters */

export const ARRAY_LENGTH_PARAMETER_INFINITE = 'unlimited' as const;

/* Matcher types */
export const CASCADING_CONTEXT_MATCHER_TYPE = '_case:CascadingContext' as const;
export const SHAPED_OBJECT_MATCHER_TYPE = '_case:ObjectShape' as const;
export const OBJECT_VALUES_MATCH_TYPE = '_case:ObjectValuesMatch' as const;
export const OBJECT_KEYS_MATCH_TYPE = '_case:ObjectKeysMatch' as const;
export const LOOKUP_MATCHER_TYPE = '_case:Lookup' as const;
export const CONTEXT_VARIABLE_TYPE = '_case:ContextVariable' as const;
export const NUMBER_MATCHER_TYPE = '_case:MatchNumber' as const;
export const STRING_MATCHER_TYPE = '_case:MatchString' as const;
export const NULL_MATCHER_TYPE = '_case:MatchNull' as const;
export const BOOLEAN_MATCHER_TYPE = '_case:MatchBoolean' as const;
export const SHAPED_ARRAY_MATCHER_TYPE = '_case:ArrayShape' as const;
export const ARRAY_LENGTH_MATCHER_TYPE = '_case:ArrayLength' as const;
export const ARRAY_EACH_ENTRY_MATCHES_TYPE =
  '_case:ArrayEachEntryLike' as const;
export const ARRAY_CONTAINS_TYPE = '_case:ArrayContains' as const;
export const COMBINE_MATCHERS_TYPE = '_case:And' as const;
export const INTEGER_MATCH_TYPE = '_case:Integer' as const;
export const STRING_CONTAINS_TYPE = '_case:StringContains' as const;
export const STRING_PREFIX_TYPE = '_case:StringPrefix' as const;
export const STRING_SUFFIX_TYPE = '_case:StringSuffix' as const;
export const BASE64_ENCODED_TYPE = '_case:Base64Encoded' as const;
export const JSON_STRINGIFIED_TYPE = '_case:JsonEncoded' as const;

export type AnyCaseNodeType =
  | typeof NUMBER_MATCHER_TYPE
  | typeof STRING_MATCHER_TYPE
  | typeof NULL_MATCHER_TYPE
  | typeof BOOLEAN_MATCHER_TYPE
  | typeof CASCADING_CONTEXT_MATCHER_TYPE
  | typeof SHAPED_ARRAY_MATCHER_TYPE
  | typeof SHAPED_OBJECT_MATCHER_TYPE
  | typeof HTTP_STATUS_CODE_MATCHER_TYPE
  | typeof HTTP_REQUEST_MATCHER_TYPE
  | typeof HTTP_RESPONSE_MATCHER_TYPE
  | typeof LOOKUP_MATCHER_TYPE
  | typeof ARRAY_LENGTH_MATCHER_TYPE
  | typeof COMBINE_MATCHERS_TYPE
  | typeof ARRAY_EACH_ENTRY_MATCHES_TYPE
  | typeof ARRAY_CONTAINS_TYPE
  | typeof OBJECT_VALUES_MATCH_TYPE
  | typeof INTEGER_MATCH_TYPE
  | typeof STRING_CONTAINS_TYPE
  | typeof STRING_PREFIX_TYPE
  | typeof STRING_SUFFIX_TYPE
  | typeof OBJECT_KEYS_MATCH_TYPE
  | typeof CONTEXT_VARIABLE_TYPE
  | typeof URL_ENCODED_STRING_TYPE
  | typeof HTTP_BASIC_AUTH_TYPE
  | typeof BASE64_ENCODED_TYPE
  | typeof JSON_STRINGIFIED_TYPE;
