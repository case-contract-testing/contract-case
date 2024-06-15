import {
  AnyCaseNodeType,
  NUMBER_MATCHER_TYPE,
  STRING_MATCHER_TYPE,
  STRING_CONTAINS_TYPE,
  STRING_PREFIX_TYPE,
  STRING_SUFFIX_TYPE,
  BOOLEAN_MATCHER_TYPE,
  CASCADING_CONTEXT_MATCHER_TYPE,
  NULL_MATCHER_TYPE,
  SHAPED_ARRAY_MATCHER_TYPE,
  SHAPED_OBJECT_MATCHER_TYPE,
  ARRAY_LENGTH_MATCHER_TYPE,
  COMBINE_MATCHERS_TYPE,
  ARRAY_EACH_ENTRY_MATCHES_TYPE,
  ARRAY_CONTAINS_TYPE,
  OBJECT_VALUES_MATCH_TYPE,
  INTEGER_MATCH_TYPE,
  OBJECT_KEYS_MATCH_TYPE,
  CONTEXT_VARIABLE_TYPE,
  JSON_STRINGIFIED_TYPE,
  BASE64_ENCODED_TYPE,
  CaseNodeFor,
} from '@contract-case/case-entities-internal';
import {
  MatcherExecutor,
  LOOKUP_MATCHER_TYPE,
} from '@contract-case/case-plugin-base';

import {
  NumberMatcher,
  StringMatcher,
  BooleanMatcher,
  NullMatcher,
  IntegerMatcher,
} from './leaf';
import {
  AndCombinationMatcher,
  CascadingContext,
  ContextVariableMatcher,
  LookupMatcher,
} from './meta';
import {
  ShapedArrayExecutor,
  ShapedObjectExecutor,
  EachArrayEntryMatches,
  ObjectEachValueMatches,
  ObjectEachKeyMatches,
  ArrayContains,
  ArrayLengthExecutor,
} from './structure';
import {
  Base64EncodedStringMatcher,
  JsonStringifiedString,
  StringContainsMatcher,
  StringPrefixMatcher,
  StringSuffixMatcher,
} from './strings';

type AllExecutors = {
  [T in AnyCaseNodeType]: MatcherExecutor<T, CaseNodeFor<T>>;
};

export const MatcherExecutors: AllExecutors = {
  [NUMBER_MATCHER_TYPE]: NumberMatcher,
  [STRING_MATCHER_TYPE]: StringMatcher,
  [STRING_CONTAINS_TYPE]: StringContainsMatcher,
  [STRING_PREFIX_TYPE]: StringPrefixMatcher,
  [STRING_SUFFIX_TYPE]: StringSuffixMatcher,
  [BOOLEAN_MATCHER_TYPE]: BooleanMatcher,
  [CASCADING_CONTEXT_MATCHER_TYPE]: CascadingContext,
  [NULL_MATCHER_TYPE]: NullMatcher,
  [SHAPED_ARRAY_MATCHER_TYPE]: ShapedArrayExecutor,
  [SHAPED_OBJECT_MATCHER_TYPE]: ShapedObjectExecutor,
  [LOOKUP_MATCHER_TYPE]: LookupMatcher,
  [ARRAY_LENGTH_MATCHER_TYPE]: ArrayLengthExecutor,
  [COMBINE_MATCHERS_TYPE]: AndCombinationMatcher,
  [ARRAY_EACH_ENTRY_MATCHES_TYPE]: EachArrayEntryMatches,
  [ARRAY_CONTAINS_TYPE]: ArrayContains,
  [OBJECT_VALUES_MATCH_TYPE]: ObjectEachValueMatches,
  [INTEGER_MATCH_TYPE]: IntegerMatcher,
  [OBJECT_KEYS_MATCH_TYPE]: ObjectEachKeyMatches,
  [CONTEXT_VARIABLE_TYPE]: ContextVariableMatcher,
  [JSON_STRINGIFIED_TYPE]: JsonStringifiedString,
  [BASE64_ENCODED_TYPE]: Base64EncodedStringMatcher,
} as AllExecutors; // TODO: Remove this assertion when we have everything loaded via plugin
