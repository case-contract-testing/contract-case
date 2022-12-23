import { SetupNamedState, SETUP_NAMED_STATE } from './types';

export const state = (name: string): SetupNamedState => ({
  'case:state:type': SETUP_NAMED_STATE,
  stateName: name,
});
