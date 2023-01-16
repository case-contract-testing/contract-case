import {
  AnyCaseNodeOrData,
  CASCADING_CONTEXT_MATCHER_TYPE,
} from 'entities/types';
import {
  NameOnlyState,
  SETUP_NAMED_STATE,
  SETUP_VARIABLE_STATE,
  StateWithVariables,
} from './types';

export const state = (
  name: string,
  variables?: Record<string, AnyCaseNodeOrData>
): NameOnlyState | StateWithVariables =>
  variables
    ? {
        'case:state:type': SETUP_VARIABLE_STATE,
        stateName: name,
        variables: Object.entries(variables)
          .map(([key, value]) => ({
            [key]: {
              // TODO: Move this somethingLike from hard coded to a function that is DRYed
              'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
              'case:matcher:child': value,
              'case:context:matchBy': 'type',
            },
          }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      }
    : {
        'case:state:type': SETUP_NAMED_STATE,
        stateName: name,
      };
