import {
  CaseConfigurationError,
  CaseCoreError,
} from '@contract-case/case-plugin-base';

/**
 * Takes a variable name in either camelCase or PascalCase,
 * and returns an all caps, snake case string, for example
 * `'camelCaseString' -> 'CAMEL_CASE_STRING'`.
 *
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
 * Takes a PascalCase string or a SCREAMING_SNAKE_CASE string, and lowercases
 * and converts to camelCase. For example, `SOME_EXAMPLE` becomes `someExample`
 * and `OtherExample` becomes `otherExample`.
 *
 * @param name - a string in PascalCase or SCREAMING_SNAKE_CASE to be replaced with camelCase
 * @returns the camelCase version
 */
export const toCamelCase = (name: string): string => {
  if (typeof name === 'string' && name.length > 2) {
    const firstCharacter = name[0];
    if (firstCharacter == null) {
      throw new CaseCoreError(
        `The string '${name}' is not empty, but somehow has a null first character`,
      );
    }

    // handle SREAMING_SNAKE_CASE
    if (name.includes('_') || name === name.toUpperCase()) {
      return name
        .split('_')
        .map((word, index) => {
          if (index === 0) {
            return word.toLowerCase();
          }
          return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
        })
        .join('');
    }

    return `${firstCharacter.toLowerCase()}${name.slice(1)}`;
  }
  throw new CaseConfigurationError(
    `Tried to get the camelCaseName from '${name}', but it wasn't a string or was less than 3 characters long`,
    'DONT_ADD_LOCATION',
    'BAD_DSL_DECLARATION',
  );
};
