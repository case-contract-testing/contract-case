import { AnyCaseMatcherOrData } from '../../matchers/matchers.types';

export const SETUP_NAMED_STATE = '_case:NamedState' as const;
export const SETUP_VARIABLE_STATE = '_case:StateWithVariables' as const;

export type HasTypeForState<T extends AnyStateType> = {
  '_case:state:type': T;
};

export type NameOnlyState = HasTypeForState<typeof SETUP_NAMED_STATE> & {
  readonly stateName: string;
};

export type StateWithVariables = HasTypeForState<
  typeof SETUP_VARIABLE_STATE
> & {
  readonly stateName: string;
  readonly variables: Record<string, AnyCaseMatcherOrData>;
};

export type AnyStateType =
  | typeof SETUP_NAMED_STATE
  | typeof SETUP_VARIABLE_STATE;

export type AnyState = NameOnlyState | StateWithVariables;
