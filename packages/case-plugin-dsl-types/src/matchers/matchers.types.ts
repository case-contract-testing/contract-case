/**
 * Base type for any matcher descriptor
 * @public
 */
export interface AnyCaseMatcher {
  '_case:matcher:type': string;
}

type JsonSerialisablePrimitive = boolean | number | string | null;

interface JsonMap {
  [key: string]: AnyData;
}
type JsonArray = Array<AnyData>;

/**
 * Helper type to represent any raw json data
 * @public
 */
export type AnyData = JsonSerialisablePrimitive | JsonMap | JsonArray;

/**
 * TODO: Remove this type, it doesn't provide much value
 * @internal
 */
export type AnyLeafOrStructure =
  | JsonSerialisablePrimitive
  | JsonOrMatcherArray
  | JsonOrMatcherMap;

/**
 * Indicates that a matcher should always resolve to this type of value
 * @public
 */
export type ResolvesTo<T extends string> = {
  '_case:matcher:resolvesTo': T;
};

/**
 * Any matcher descriptor or data
 * @public
 */
export type AnyCaseMatcherOrData =
  | AnyCaseMatcher
  | AnyData
  | AnyLeafOrStructure;

/**
 * Any json object that might contain data or matchers
 * @public
 */
export type JsonOrMatcherMap = {
  [key: string]: AnyCaseMatcherOrData;
};
/**
 * Any json array that might contain data or matchers
 * @public
 */
export type JsonOrMatcherArray = Array<AnyCaseMatcherOrData>;
