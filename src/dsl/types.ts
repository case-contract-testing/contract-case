export type JsonPrimitive = boolean | number | string | null;
export type AnyJson = JsonPrimitive | JsonArray | JsonMap;
export interface JsonMap {
  [key: string]: AnyJson;
}
export type JsonArray = Array<AnyJson>;
