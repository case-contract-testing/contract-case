import {
  CoreNumberMatcher,
  CoreStringMatcher,
  CoreBooleanMatcher,
  CoreNullMatcher,
  MatchContextByType,
} from '@contract-case/case-entities-internal';

export type NumberMatcher = CoreNumberMatcher & MatchContextByType;
export type StringMatcher = CoreStringMatcher & MatchContextByType;
export type BooleanMatcher = CoreBooleanMatcher & MatchContextByType;
export type NullMatcher = CoreNullMatcher & MatchContextByType;
