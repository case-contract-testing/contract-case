/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This type is used for any matcher, when viewing through jsii
 * @public
 */
export type BoundaryAnyMatcher = any;

/**
 * This type is used for any matcher, when viewing through jsii
 * @public
 */
export type BoundaryAnyState = any;

/**
 * This type is used for any matcher, when viewing through jsii
 * @public
 */
export type BoundaryAnyMockDescriptor = any;

/**
 * This interface describes a Mock Definition, when viewing through jsii
 * @public
 */
export interface BoundaryMockDefinition {
  // TODO: Types for states
  readonly states: Array<BoundaryAnyState>;
  readonly definition: BoundaryAnyMockDescriptor;
}
