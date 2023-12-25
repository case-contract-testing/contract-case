import {
  JavaScriptValue,
  Struct,
  Value,
} from 'google-protobuf/google/protobuf/struct_pb';

export const makeGrpcStruct = (struct: Record<string, unknown>): Struct =>
  Struct.fromJavaScript(struct as { [key: string]: JavaScriptValue });

export const makeGrpcValue = (value: unknown): Value => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value == null ||
    Array.isArray(value)
  ) {
    return Value.fromJavaScript(value as JavaScriptValue);
  }
  return new Value().setStructValue(
    Struct.fromJavaScript(value as Record<string, JavaScriptValue>),
  );
};
