export interface AnyCaseMatcher {
  '_case:matcher:type': string;
}

type JsonSerialisablePrimitive = boolean | number | string | null;

interface JsonMap {
  [key: string]: AnyData;
}
type JsonArray = Array<AnyData>;

export type AnyData = JsonSerialisablePrimitive | JsonMap | JsonArray;

export type AnyLeafOrStructure =
  | JsonSerialisablePrimitive
  | JsonOrMatcherArray
  | JsonOrMatcherMap;

export type ResolvesTo<T extends string> = {
  '_case:matcher:resolvesTo': T;
};

export type AnyCaseMatcherOrData =
  | AnyCaseMatcher
  | AnyData
  | AnyLeafOrStructure;

export type JsonOrMatcherMap = {
  [key: string]: AnyCaseMatcherOrData;
};
export type JsonOrMatcherArray = Array<AnyCaseMatcherOrData>;
