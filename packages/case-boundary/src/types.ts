/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This interface describes a Mock Definition as seen by the boundary
 * @public
 */
export interface BoundaryMockDefinition {
  // TODO: Types for states
  readonly states: Array<any>;
  readonly definition: any;
}

/**
 * This type is used for any matcher
 * @public
 */
export type BoundaryAnyMatcher = any;
