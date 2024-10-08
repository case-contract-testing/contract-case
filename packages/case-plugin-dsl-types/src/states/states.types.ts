import { AnyCaseMatcherOrData } from '../matchers/types';

/**
 * Type identifier constant for the built-in {@link NameOnlyState} type.
 * @public
 */
export const SETUP_NAMED_STATE = '_case:NamedState' as const;
/**
 *  Type identifier constant for the built-in {@link StateWithVariables} type.
 * @public
 */
export const SETUP_VARIABLE_STATE = '_case:StateWithVariables' as const;

/**
 * Helper type for extracting state types by their constant
 * @public
 */
export type HasTypeForState<T extends AnyStateType> = {
  '_case:state:type': T;
};

/**
 * Describes a state that only has a name and no other information
 * @public
 */
export type NameOnlyState = HasTypeForState<typeof SETUP_NAMED_STATE> & {
  /**
   * The human readable state name, for identifying state handlers.
   * Any string is acceptable, though we recommend keeping state names short.
   *
   * In a future release, some specific state names may be reserved.
   */
  readonly stateName: string;
};

/**
 * Describes a named state that also contains some variables. These variables can be
 * returned by state handlers later.
 * @public
 */
export type StateWithVariables = HasTypeForState<
  typeof SETUP_VARIABLE_STATE
> & {
  /**
   * The human readable state name, for identifying state handlers.
   * Any string is acceptable, though we recommend keeping state names short.
   *
   * In a future release, some specific state names may be reserved.
   */
  readonly stateName: string;
  /**
   * Default values and matchers for the variables. The state handler must return
   * a value for each of these named variables. We recommend keeping variables
   * human readable and short. Since the state handler needs to return these, we
   * recommend using similar naming conventions to variables in your chosen
   * language.
   */
  readonly variables: Record<string, AnyCaseMatcherOrData>;
};

/**
 * Union type of all currently known State identifier strings.
 * @public
 */
export type AnyStateType =
  | typeof SETUP_NAMED_STATE
  | typeof SETUP_VARIABLE_STATE;

/**
 * Union type of all currently known State types.
 * @public
 */
export type AnyState = NameOnlyState | StateWithVariables;
