import {
  StringMatcher,
  CoreStringPrefixMatcher,
  CoreStringSuffixMatcher,
  CoreStringContainsMatcher,
  CoreBase64Encoded,
  CoreJsonStringified,
} from '@contract-case/case-entities-internal';
import {
  StringPrefix,
  AnyString,
  StringSuffix,
  Base64Encoded,
  StringContaining,
  StringifiedJson,
} from '.';

describe('primitive matchers', () => {
  it('any string matcher compiles', () => {
    const a: StringMatcher = new AnyString('1');

    expect(a).not.toBeNull();
  });

  it('string prefix matcher compiles', () => {
    const a: CoreStringPrefixMatcher = new StringPrefix('1', '2');

    expect(a).not.toBeNull();
  });

  it('string suffix matcher compiles', () => {
    const a: CoreStringSuffixMatcher = new StringSuffix('1', '2');

    expect(a).not.toBeNull();
  });

  it('string contains matcher compiles', () => {
    const a: CoreStringContainsMatcher = new StringContaining('1', '12');

    expect(a).not.toBeNull();
  });

  it('base64Encoded matcher compiles', () => {
    const a: CoreBase64Encoded = new Base64Encoded('someString');

    expect(a).not.toBeNull();
  });

  it('stringifiedJson matcher compiles', () => {
    const a: CoreJsonStringified = new StringifiedJson('"someString"');

    expect(a).not.toBeNull();
  });
});
