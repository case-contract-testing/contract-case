import type { Struct, Value } from 'google-protobuf/google/protobuf/struct_pb';
import { ConnectorError } from '../../../domain/errors';

export const mapJsonMap = (
  struct: Struct | undefined,
): Record<string, unknown> => {
  if (struct === undefined) {
    throw new ConnectorError('Expected a json map, but got undefined');
  }
  return struct.toJavaScript();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapJson = (value: Value | Struct | undefined): any => {
  if (value === undefined) {
    throw new ConnectorError('Expected a json value, but got undefined');
  }
  return value.toJavaScript();
};
