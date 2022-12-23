export const SETUP_NAMED_STATE = 'SetupNamedState' as const;

export type SetupNamedState = HasTypeForState<typeof SETUP_NAMED_STATE> & {
  stateName: string;
};

export type AnyStateType = typeof SETUP_NAMED_STATE;

export type AnyState = SetupNamedState;

export type HasTypeForState<T extends AnyStateType> = {
  'case:state:type': T;
};
