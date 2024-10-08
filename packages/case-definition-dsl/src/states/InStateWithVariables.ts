import { SETUP_VARIABLE_STATE } from '@contract-case/case-plugin-dsl-types';
import { AnyState } from './AnyState';
import { AnyMatcherOrData } from '../types';

/**
 * A state descriptor for configuring an example that needs to run in a
 * particular named state, and with variables provided by the framework.
 *
 * @public
 */
export class InStateWithVariables extends AnyState {
  /** @internal */
  readonly '_case:state:type': typeof SETUP_VARIABLE_STATE;

  readonly variables: Record<string, AnyMatcherOrData>;

  /**
   * A state descriptor for configuring an example that needs to run in a
   * particular named state, and with variables provided by the framework.
   *
   * @param stateName - The name of the state used by this example. This must
   * match one of the state handlers provided in the configuration during the
   * example run.
   *
   * @param variables - A object where the keys are variable names, mapped to any data or matcher objects.
   */
  constructor(stateName: string, variables: Record<string, AnyMatcherOrData>) {
    super(SETUP_VARIABLE_STATE, stateName);
    this.variables = variables;
  }
}
