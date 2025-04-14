import { and, anyString, anyNumber } from '../boundaries';
import { rawEquality } from './rawEquals';

describe('raw equals', () => {
  it('accepts equal arrays', () => {
    expect(rawEquality([0], [0])).toBe(true);
    expect(rawEquality([false, 0, {}, [1]], [false, 0, {}, [1]])).toBe(true);
    expect(
      rawEquality(
        [false, 0, { a: '', b: 12 }, [1]],
        [false, 0, { a: '', b: 12 }, [1]],
      ),
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
        [false, 0, { a: '', b: 12 }, [1]],
      ),
    ).toBe(false);
    expect(
      rawEquality(
        [false, 0, { a: 0, b: 12 }, [1]],
        [false, 0, { a: '', b: 12 }, [1]],
      ),
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

  it('handles matchers', () => {
    const matcher = {
      status: {
        '_case:matcher:type': '_case:HttpStatusCode',
        '_case:matcher:example': 200,
        '_case:matcher:rule': 200,
        '_case:matcher:resolvesTo': 'HttpStatusCode',
      },
      body: { status: 'up' },
      '_case:matcher:type': '_case:HttpResponseMatcher',
    };

    expect(rawEquality(matcher, matcher)).toBe(true);
    expect(
      rawEquality(matcher, {
        status: {
          '_case:matcher:type': '_case:HttpStatusCode',
          '_case:matcher:example': 200,
          '_case:matcher:rule': '200',
          '_case:matcher:resolvesTo': 'HttpStatusCode',
        },
        body: { status: 'up' },
        '_case:matcher:type': '_case:HttpResponseMatcher',
      }),
    ).toBe(false);
  });
});

it('handles the object that came from the Java Wrapper bug', () => {
  expect(
    rawEquality(
      {
        body: null,
        headers: null,
        method: 'GET',
        path: '/product/10',
        query: null,
        uniqueName: null,
      },
      {
        body: null,
        headers: null,
        method: 'GET',
        path: '/product/10',
        query: null,
        uniqueName: null,
      },
    ),
  ).toBe(true);
});
