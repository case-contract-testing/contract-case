import { CaseConfigurationError } from '../../../../../../../entities';

type FieldDescriptor<T extends object> = {
  field: keyof T;
  type: string;
  notNull?: boolean;
};

type DataAssertions<T extends object> = {
  assertFieldPresent: (f: FieldDescriptor<T>) => void;
  assertIfFieldPresent: (f: FieldDescriptor<T>) => void;
};

const assertPresentInternal = <T extends object>(
  data: T,
  { field, type, notNull }: FieldDescriptor<T>,
  name: string
) => {
  if (!(field in data)) {
    throw new CaseConfigurationError(
      `${name} must contain a '${String(field)}' key`
    );
  }

  if (typeof data[field] !== type) {
    throw new CaseConfigurationError(
      `${name}'s ${String(field)} must be a ${type}`
    );
  }
  if (notNull && data[field] === null) {
    throw new CaseConfigurationError(
      `${name}'s ${String(field)} must not be null`
    );
  }
};

const ifPresentInternal = <T extends object>(
  data: T,
  { field, type, notNull }: FieldDescriptor<T>,
  name: string
) => {
  if (field in data) {
    if (typeof data[field] !== type) {
      throw new CaseConfigurationError(
        `${name}'s ${String(field)} must be a ${type}`
      );
    }
    if (notNull && data[field] === null) {
      throw new CaseConfigurationError(
        `${name}'s ${String(field)} must not be null`
      );
    }
  }
};

export const makeAssertionsOn = <T extends object>(
  data: T,
  name: string
): DataAssertions<T> => ({
  assertFieldPresent: ({ field, type }: FieldDescriptor<T>) =>
    assertPresentInternal(data, { field, type }, name),
  assertIfFieldPresent: ({ field, type }: FieldDescriptor<T>) =>
    ifPresentInternal(data, { field, type }, name),
});
