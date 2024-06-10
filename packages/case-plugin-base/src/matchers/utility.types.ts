import { AnyCaseMatcher, AnyLeafOrStructure } from './matchers.types';

export type HasExample<T extends AnyCaseMatcher> = T & {
  '_case:matcher:example': unknown;
};

export interface IsCaseNodeForType<T extends string> {
  '_case:matcher:type': T;
}

export type CaseMatcherFor<KnownMatcherDescriptors, T extends string> = Extract<
  KnownMatcherDescriptors,
  IsCaseNodeForType<T>
>;

export type DataOrCaseNodeFor<KnownMatcherDescriptors, T extends string> =
  | CaseMatcherFor<KnownMatcherDescriptors, T>
  | AnyLeafOrStructure;
