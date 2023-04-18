import {
  CoreArrayContainsMatch,
  CoreArrayEachEntryMatches,
  CoreArrayLengthMatcher,
  CoreShapedArrayMatcher,
} from '@contract-case/case-entities-internal';
import {
  ArrayContains,
  ArrayEachEntryMatches,
  ArrayEachEntryMatchesWithExample,
  ArrayLength,
  ArrayStartsWith,
} from '.';

describe('array matchers', () => {
  it('array entry with examples matcher compiles', () => {
    const a: CoreArrayEachEntryMatches = new ArrayEachEntryMatchesWithExample(
      '1',
      ['2']
    );

    expect(a).not.toBeNull();
  });

  it('array entry matcher compiles', () => {
    const a: CoreArrayEachEntryMatches = new ArrayEachEntryMatches('1');

    expect(a).not.toBeNull();
  });

  it('array length matcher compiles', () => {
    const a: CoreArrayLengthMatcher = new ArrayLength({
      minLength: 2,
      maxLength: 3,
    });

    expect(a).not.toBeNull();
  });

  it('array contains matcher compiles', () => {
    const a: CoreArrayContainsMatch = new ArrayContains([]);

    expect(a).not.toBeNull();
  });

  it('array starts with matcher compiles', () => {
    const a: CoreShapedArrayMatcher = new ArrayStartsWith([]);

    expect(a).not.toBeNull();
  });
});
