import { SETUP_NAMED_STATE } from '@contract-case/case-entities-internal';
import { AnyState } from './AnyState';

/**
 * A state descriptor for configuring an example that needs to run in a
 * particular named state.
 *
 * @public
 */
export class InState extends AnyState {
  /** @internal */
  readonly '_case:state:type': typeof SETUP_NAMED_STATE;

  /**
   * Constructs a new state descriptor
   *
   * @param stateName - The name of the state used by this example. This must
   * match one of the state handlers provided in the configuration during the
   * example run.
   */
  constructor(stateName: string) {
    super(SETUP_NAMED_STATE, stateName);
  }
}
