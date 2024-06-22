import {
  BoolValue,
  StringValue,
} from 'google-protobuf/google/protobuf/wrappers_pb.js';
import { ConnectorError } from '../../../domain/errors/index.js';

export const unbox = (value: StringValue | undefined): string => {
  if (value != null) {
    return value.getValue();
  }
  throw new ConnectorError('Expected a string value, but it was missing');
};

export const unboxOrUndefined = (
  value: StringValue | undefined,
): string | undefined => {
  if (value != null) {
    return value.getValue();
  }
  return undefined;
};

export const unboxBoolOrUndefined = (
  value: BoolValue | undefined,
): boolean | undefined => {
  if (value != null) {
    return value.getValue();
  }
  return undefined;
};
