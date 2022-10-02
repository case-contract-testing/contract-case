import type { MatchContextByType } from 'entities/context/types';
import type {
  CoreNumberMatcher,
  CoreBooleanMatcher,
  CoreNullMatcher,
  CoreStringMatcher,
} from 'entities/nodes/matchers/types';

export type NumberMatcher = CoreNumberMatcher & MatchContextByType;
export type StringMatcher = CoreStringMatcher & MatchContextByType;
export type BooleanMatcher = CoreBooleanMatcher & MatchContextByType;
export type NullMatcher = CoreNullMatcher & MatchContextByType;
