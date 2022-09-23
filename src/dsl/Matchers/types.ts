import type { MatchContextByType } from 'core/context/types';
import type {
  CoreNumberMatcher,
  CoreBooleanMatcher,
  CoreNullMatcher,
  CoreStringMatcher,
  AnyCaseNodeOrData,
} from 'core/matchers/types';

export type NumberMatcher = CoreNumberMatcher & MatchContextByType;
export type StringMatcher = CoreStringMatcher & MatchContextByType;
export type BooleanMatcher = CoreBooleanMatcher & MatchContextByType;
export type NullMatcher = CoreNullMatcher & MatchContextByType;

export interface HttpRequestDescription {
  path: string;
  response: {
    status: number;
    body?: AnyCaseNodeOrData;
  };
}
