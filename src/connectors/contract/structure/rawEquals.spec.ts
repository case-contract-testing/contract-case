import { and, anyNumber, anyString } from 'boundaries/dsl/Matchers';
import { rawEquality } from './rawEquals';

describe('raw equals', () => {
  it('accepts equal arrays', () => {
    expect(rawEquality([0], [0])).toBe(true);
    expect(rawEquality([false, 0, {}, [1]], [false, 0, {}, [1]])).toBe(true);
    expect(
      rawEquality(
        [false, 0, { a: '', b: 12 }, [1]],
        [false, 0, { a: '', b: 12 }, [1]]
      )
    ).toBe(true);
    expect(rawEquality([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true);
  });
  it('rejects unequal arrays', () => {
    expect(rawEquality([1, 2, 3], [1, 2, 3, 4])).toBe(false);
    expect(rawEquality([1, 2, 3, 4], [1, 2, 3])).toBe(false);
    expect(rawEquality([0, 2, 3, 4], [1, 2, 3, 4])).toBe(false);
    expect(rawEquality([0], [false])).toBe(false);
    expect(
      rawEquality(
        [false, 0, { a: '', b: 1 }, [1]],
        [false, 0, { a: '', b: 12 }, [1]]
      )
    ).toBe(false);
    expect(
      rawEquality(
        [false, 0, { a: 0, b: 12 }, [1]],
        [false, 0, { a: '', b: 12 }, [1]]
      )
    ).toBe(false);
  });

  it('accepts equal objects', () => {
    expect(rawEquality({}, {})).toBe(true);
    expect(rawEquality(and(anyString()), and(anyString()))).toBe(true);
  });
  it('rejects unequal objects', () => {
    expect(rawEquality({ a: '', b: 1 }, {})).toBe(false);
    expect(rawEquality(and(anyString()), and(anyNumber()))).toBe(false);
  });
});
