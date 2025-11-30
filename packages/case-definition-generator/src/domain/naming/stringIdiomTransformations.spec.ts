import {
  CaseConfigurationError,
  CaseCoreError,
} from '@contract-case/case-plugin-base';
import {
  toScreamingSnakeCase,
  toCamelCase,
} from './stringIdiomTransformations';

describe('string idiom transformations', () => {
  describe('toScreamingSnakeCase', () => {
    it('converts camelCase to SCREAMING_SNAKE_CASE', () => {
      expect(toScreamingSnakeCase('camelCaseString')).toBe('CAMEL_CASE_STRING');
    });

    it('converts PascalCase to SCREAMING_SNAKE_CASE', () => {
      expect(toScreamingSnakeCase('PascalCaseString')).toBe(
        'PASCAL_CASE_STRING',
      );
    });

    it('handles single uppercase letters correctly', () => {
      expect(toScreamingSnakeCase('A')).toBe('A');
    });

    it('handles single lowercase letters correctly', () => {
      expect(toScreamingSnakeCase('a')).toBe('A');
    });

    it('throws on null characters in the string', () => {
      const badString = { length: 2, 0: 'a' };
      expect(() =>
        toScreamingSnakeCase(badString as unknown as string),
      ).toThrow(CaseCoreError);
    });

    it('handles strings with existing underscores', () => {
      expect(toScreamingSnakeCase('some_snake_case')).toBe('SOME_SNAKE_CASE');
    });

    it('handles empty strings', () => {
      expect(toScreamingSnakeCase('')).toBe('');
    });
  });

  describe('toCamelCase', () => {
    it('converts PascalCase to camelCase', () => {
      expect(toCamelCase('PascalCase')).toBe('pascalCase');
    });

    it('leaves camelCase as camelCase', () => {
      expect(toCamelCase('camelCase')).toBe('camelCase');
    });

    it('throws if the string is too short (length 2)', () => {
      expect(() => toCamelCase('Hi')).toThrow(CaseConfigurationError);
      expect(() => toCamelCase('Hi')).toThrow(
        "Tried to get the camelCaseName from 'Hi', but it wasn't a string or was too short",
      );
    });

    it('throws if the string is too short (length 1)', () => {
      expect(() => toCamelCase('H')).toThrow(CaseConfigurationError);
    });

    it('throws if the string is empty', () => {
      // This falls under "too short" or "not a string" check
      expect(() => toCamelCase('')).toThrow(CaseConfigurationError);
    });

    it('throws if the input is not a string', () => {
      expect(() => toCamelCase(123 as any)).toThrow(CaseConfigurationError);
      expect(() => toCamelCase(null as any)).toThrow(CaseConfigurationError);
      expect(() => toCamelCase(undefined as any)).toThrow(
        CaseConfigurationError,
      );
    });
  });
});
