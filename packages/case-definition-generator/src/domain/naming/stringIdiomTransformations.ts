import {
  CaseConfigurationError,
  CaseCoreError,
} from '@contract-case/case-plugin-base';

/**
 * Takes a camel-case string, for example, camelCaseString and returns an all
 * caps, snake case string, for example CAMEL_CASE_STRING
 * @param name - a string to turn into SCREAMING_SNAKE_CASE
 * @returns the SCREAMING_SNAKE_CASE representation
 */
export const toScreamingSnakeCase = (name: string): string => {
  let result = '';
  for (let i = 0; i < name.length; i += 1) {
    const char = name[i];
    if (char == null) {
      throw new CaseCoreError(
        `Illegal null contained in string in toScreamingSnakeCase(). String wass '${name}'`,
      );
    }
    const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
    if (i > 0 && isUpper && name[i - 1] !== '_') {
      result += '_';
    }
    result += char.toUpperCase();
  }
  return result;
};

/**
 * Takes a PascalCase string and lowercases the first character, eg to `camelCase`
 * @param name - a string in camelCase to be replaced with camelCase
 * @returns the camelCase version
 */
export const toCamelCase = (name: string): string => {
  if (typeof name === 'string' && name.length > 2) {
    const firstCharacter = name[0];
    if (firstCharacter == null) {
      throw new CaseCoreError(
        `The string '${name}' is empty, but somehow has a null first character`,
      );
    }

    return `${firstCharacter.toLowerCase()}${name.slice(1)}`;
  }
  throw new CaseConfigurationError(
    `Tried to get the camelCaseName from '${name}', but it wasn't a string or was too short`,
    'DONT_ADD_LOCATION',
    'BAD_DSL_DECLARATION',
  );
};
