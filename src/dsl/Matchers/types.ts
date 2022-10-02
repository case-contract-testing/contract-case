import type { MatchContextByType } from 'core/context/types';
import type {
  CoreNumberMatcher,
  CoreBooleanMatcher,
  CoreNullMatcher,
  CoreStringMatcher,
} from 'core/nodes/matchers/types';

export type NumberMatcher = CoreNumberMatcher & MatchContextByType;
export type StringMatcher = CoreStringMatcher & MatchContextByType;
export type BooleanMatcher = CoreBooleanMatcher & MatchContextByType;
export type NullMatcher = CoreNullMatcher & MatchContextByType;
