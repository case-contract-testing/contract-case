import { AnyCaseMatcher, AnyLeafOrStructure } from './matchers.types';

export type HasExample<T extends AnyCaseMatcher> = T & {
  '_case:matcher:example': unknown;
};

export interface IsCaseNodeForType<T extends string> {
  '_case:matcher:type': T;
}

export type CaseMatcherFor<
  KnownMatcherTypes extends string,
  T extends KnownMatcherTypes,
> = Extract<AnyCaseMatcher, IsCaseNodeForType<T>>;

export type DataOrCaseNodeFor<
  KnownMatcherTypes extends string,
  T extends KnownMatcherTypes,
> = CaseMatcherFor<KnownMatcherTypes, T> | AnyLeafOrStructure;
