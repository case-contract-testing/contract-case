import { CaseConfigurationError } from 'entities';
import {
  ARRAY_LENGTH_PARAMETER_INFINITE,
  ARRAY_LENGTH_MATCHER_TYPE,
  CoreArrayLengthMatcher,
} from 'entities/types';

type ArrayLengthOptions = { minLength?: number; maxLength?: number };

/**
 * Matches an Array whose length is within a certain range.
 *
 * @param options
 */
export const arrayLength = ({
  minLength,
  maxLength,
}: ArrayLengthOptions): CoreArrayLengthMatcher => {
  const matcher = {
    'case:matcher:type': ARRAY_LENGTH_MATCHER_TYPE,
    'case:matcher:minLength': minLength !== undefined ? minLength : 1,
    'case:matcher:maxLength':
      maxLength !== undefined ? maxLength : ARRAY_LENGTH_PARAMETER_INFINITE,
  };
  if (matcher['case:matcher:minLength'] === 0) {
    throw new CaseConfigurationError(
      "Can't create an arrayLength matcher with minimum size 0. Use a raw empty array instead. See the documentation for details."
    );
    // TODO write documentation for this
  }
  return matcher;
};
