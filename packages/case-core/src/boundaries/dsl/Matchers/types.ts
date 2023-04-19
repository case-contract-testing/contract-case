import {
  CoreNumberMatcher,
  CoreStringMatcher,
  CoreBooleanMatcher,
  CoreNullMatcher,
} from '@contract-case/case-entities-internal';
import type { MatchContextByType } from '../../../entities/types';

export type NumberMatcher = CoreNumberMatcher & MatchContextByType;
export type StringMatcher = CoreStringMatcher & MatchContextByType;
export type BooleanMatcher = CoreBooleanMatcher & MatchContextByType;
export type NullMatcher = CoreNullMatcher & MatchContextByType;
