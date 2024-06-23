import { AnyCaseMatcher, AnyLeafOrStructure } from './matchers.types';

/**
 * A matcher descriptor that has an example
 * @public
 */
export type HasExample<T extends AnyCaseMatcher> = T & {
  '_case:matcher:example': unknown;
};

/**
 * The base type for a case matcher descriptor that has this string constant
 * @public
 */
export interface IsCaseNodeForType<T extends string> {
  '_case:matcher:type': T;
}

/**
 * Helper type to extract a case matcher descriptor out of a list of descriptors
 * @public
 */
export type CaseMatcherFor<KnownMatcherDescriptors, T extends string> = Extract<
  KnownMatcherDescriptors,
  IsCaseNodeForType<T>
>;

/**
 * Helper type that could be data or a case node for this type
 *
 * @internal
 */
export type DataOrCaseNodeFor<KnownMatcherDescriptors, T extends string> =
  | CaseMatcherFor<KnownMatcherDescriptors, T>
  | AnyLeafOrStructure;
