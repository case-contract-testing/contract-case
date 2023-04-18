import { AnyCaseNodeType } from './constants.types';
import { AnyCaseMatcher } from './definitions.types';

export type HasExample<T extends AnyCaseMatcher> = T & {
  '_case:matcher:example': unknown;
};

interface IsCaseNodeForType<T extends AnyCaseNodeType> {
  '_case:matcher:type': T;
}

export type CaseNodeFor<T extends AnyCaseNodeType> = Extract<
  AnyCaseMatcher,
  IsCaseNodeForType<T>
>;
