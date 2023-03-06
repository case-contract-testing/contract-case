import type {
  CoreNumberMatcher,
  MatchContextByType,
  CoreStringMatcher,
  CoreBooleanMatcher,
  CoreNullMatcher,
} from '../../../entities/types';

export type NumberMatcher = CoreNumberMatcher & MatchContextByType;
export type StringMatcher = CoreStringMatcher & MatchContextByType;
export type BooleanMatcher = CoreBooleanMatcher & MatchContextByType;
export type NullMatcher = CoreNullMatcher & MatchContextByType;
