import {
  ARRAY_LENGTH_MATCHER_TYPE,
  ARRAY_LENGTH_PARAMETER_INFINITE,
} from '@contract-case/case-entities-internal';
import { AnyMatcher } from '../base';

/**
 * Options for the `ArrayLength` matcher
 * @public
 */
export interface ArrayLengthOptions {
  /**
   * The minimum length for the array - must be greater than zero, otherwise
   * empty arrays pass and you wouldn't be testing the array contents.
   *
   * Default 1.
   */
  readonly minLength?: number;
  /**
   * The maximum length for the array - must be greater than minimum length
   *
   * Default infinity.
   */
  readonly maxLength?: number;
}

/**
 * Matches an Array whose length is within the specified range (or 1-infinity if not specified).
 * @public
 */
export class ArrayLength extends AnyMatcher {
  /** @internal */
  readonly '_case:matcher:type': typeof ARRAY_LENGTH_MATCHER_TYPE;

  /** @internal */
  readonly '_case:matcher:minLength': number;

  /** @internal */
  readonly '_case:matcher:maxLength':
    | number
    | typeof ARRAY_LENGTH_PARAMETER_INFINITE;

  /**
   * @param options - An `ArrayLengthOptions` object with optional minLength (default 1) and maxLength (default infinity) properties.
   */
  constructor(options: ArrayLengthOptions) {
    super(ARRAY_LENGTH_MATCHER_TYPE);
    this['_case:matcher:minLength'] =
      options.minLength !== undefined ? options.minLength : 1;
    this['_case:matcher:maxLength'] =
      options.maxLength !== undefined
        ? options.maxLength
        : ARRAY_LENGTH_PARAMETER_INFINITE;
  }

  /**
   * For non-TypeScript implementations (see [AnyMatcher.toJSON()](#\@case-contract-testing/test-equivalence-matchers.AnyMatcher.toJSON))
   *
   * @privateRemarks
   * This comment and the implementation is boilerplate on all matchers to avoid
   * outputting duplicate unimportant documentation on all matcher classes of
   * the docs. Only modify this comment or the implementation via search and replace.
   */
  override toJSON(): unknown {
    return super.toJSON();
  }
}
