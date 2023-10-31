import { AnyMockDescriptor, AnyState } from '@contract-case/case-core';
import { AnyCaseMatcherOrData } from '@contract-case/case-entities-internal';

/**
 * This type is used for any matcher
 * @public
 */
export type TsBoundaryAnyMatcher = AnyCaseMatcherOrData;

/**
 * This type is used for any matcher
 * @public
 */
export type TsBoundaryAnyState = AnyState;

/**
 * This type is used for any matcher
 * @public
 */
export type TsBoundaryAnyMockDescriptor = AnyMockDescriptor;

/**
 * This interface describes a Mock Definition, when viewing through jsii
 * @public
 */
export interface TsBoundaryMockDefinition {
  // TODO: Types for states
  readonly states: Array<TsBoundaryAnyState>;
  readonly definition: TsBoundaryAnyMockDescriptor;
}
