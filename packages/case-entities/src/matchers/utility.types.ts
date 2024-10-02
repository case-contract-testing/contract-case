import { AnyLeafOrStructure } from '@contract-case/case-plugin-dsl-types';
import { AnyCaseNodeType } from './constants.types';
import { AnyCaseMatcher } from './definitions.types';

export type HasExample<T extends AnyCaseMatcher> = T & {
  '_case:matcher:example': AnyCaseMatcherOrData;
};

export const hasExample = <T extends AnyCaseMatcher>(
  maybeMatcher: unknown,
): maybeMatcher is HasExample<T> =>
  typeof maybeMatcher === 'object' &&
  maybeMatcher !== null &&
  '_case:matcher:example' in maybeMatcher;

interface IsCaseNodeForType<T extends AnyCaseNodeType> {
  '_case:matcher:type': T;
}

export type CaseNodeFor<T extends AnyCaseNodeType> = Extract<
  AnyCaseMatcher,
  IsCaseNodeForType<T>
>;

export type DataOrCaseNodeFor<T extends AnyCaseNodeType> =
  | CaseNodeFor<T>
  | AnyLeafOrStructure;

export type AnyCaseMatcherOrData = AnyLeafOrStructure | AnyCaseMatcher;
