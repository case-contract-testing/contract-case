import {
  CaseConfigurationError,
  MatchContext,
} from '@contract-case/case-plugin-base';

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
  name: string,
  context: MatchContext,
) => {
  if (!(field in data)) {
    throw new CaseConfigurationError(
      `${name} must contain a '${String(field)}' key`,
      context,
      'BAD_INTERACTION_DEFINITION',
    );
  }

  if (typeof data[field] !== type) {
    throw new CaseConfigurationError(
      `${name}'s ${String(field)} must be a ${type}`,
      context,
      'BAD_INTERACTION_DEFINITION',
    );
  }
  if (notNull && data[field] === null) {
    throw new CaseConfigurationError(
      `${name}'s ${String(field)} must not be null`,
      context,
      'BAD_INTERACTION_DEFINITION',
    );
  }
};

const ifPresentInternal = <T extends object>(
  data: T,
  { field, type, notNull }: FieldDescriptor<T>,
  name: string,
  context: MatchContext,
) => {
  if (field in data) {
    if (typeof data[field] !== type) {
      throw new CaseConfigurationError(
        `${name}'s ${String(field)} must be a ${type}`,
        context,
        'BAD_INTERACTION_DEFINITION',
      );
    }
    if (notNull && data[field] === null) {
      throw new CaseConfigurationError(
        `${name}'s ${String(field)} must not be null`,
        context,
        'BAD_INTERACTION_DEFINITION',
      );
    }
  }
};

export const makeAssertionsOn = <T extends object>(
  data: T,
  name: string,
  context: MatchContext,
): DataAssertions<T> => ({
  assertFieldPresent: (descriptor: FieldDescriptor<T>) =>
    assertPresentInternal(data, descriptor, name, context),
  assertIfFieldPresent: (descriptor: FieldDescriptor<T>) =>
    ifPresentInternal(data, descriptor, name, context),
});
