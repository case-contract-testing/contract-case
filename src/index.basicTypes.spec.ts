import type { AnyCaseNodeOrData } from 'entities/nodes/matchers/types';
import { arrayStartsWith } from 'boundaries/dsl/Matchers';
import type {} from 'entities//types';
import { CaseContract } from 'boundaries';
import { DEFAULT_CONFIG } from 'connectors/contract/core';

describe('basic types and structure checks', () => {
  const contract = new CaseContract(
    {
      consumerName: 'test lookup consumer',
      providerName: 'test lookup provider',
    },
    DEFAULT_CONFIG
  );

  const expectErrorContaining = (
    matcher: AnyCaseNodeOrData,
    example: unknown,
    expectedContent: string
  ) => {
    describe(`when given ${example}`, () => {
      it(`returns an error containing '${expectedContent}'`, async () => {
        const matchResult = await contract.checkMatch(matcher, example);
        expect(matchResult).not.toHaveLength(0);
        expect(
          matchResult
            .map((m) => m.toString())
            .reduce((acc, m) => `${acc} ${m}`, '')
        ).toContain(expectedContent);
      });
    });
  };

  describe('exact matches', () => {
    describe('basic primitives', () => {
      describe('number', () => {
        const matcher = 1;
        it('accepts the exact example', async () => {
          expect(await contract.checkMatch(matcher, 1)).toStrictEqual([]);
        });
        expectErrorContaining(matcher, 2, 'not exactly equal ');
        expectErrorContaining(matcher, NaN, 'not exactly equal');
        expectErrorContaining(matcher, Infinity, 'not exactly equal');
        expectErrorContaining(matcher, '1', 'not exactly equal');
        expectErrorContaining(matcher, [], 'not exactly equal');
        expectErrorContaining(matcher, {}, 'not exactly equal');
      });

      describe('string', () => {
        const matcher = 'example string';
        it('accepts exactly the string', async () => {
          expect(
            await contract.checkMatch(matcher, 'example string')
          ).toStrictEqual([]);
        });

        expectErrorContaining(matcher, '1', 'not exactly equal');
        expectErrorContaining(
          matcher,
          'some other string',
          'not exactly equal'
        );
        expectErrorContaining(matcher, NaN, 'not exactly equal');
        expectErrorContaining(matcher, Infinity, 'not exactly equal');
        expectErrorContaining(matcher, 1, 'not exactly equal');
        expectErrorContaining(matcher, [], 'not exactly equal');
        expectErrorContaining(matcher, {}, 'not exactly equal');
      });

      describe('boolean', () => {
        const matcher = true;
        it('accepts exactly true', async () => {
          expect(await contract.checkMatch(matcher, true)).toStrictEqual([]);
        });

        expectErrorContaining(matcher, false, 'not exactly equal');
        expectErrorContaining(matcher, '1', 'not exactly equal');
        expectErrorContaining(
          matcher,
          'some other string',
          'not exactly equal'
        );
        expectErrorContaining(matcher, NaN, 'not exactly equal');
        expectErrorContaining(matcher, Infinity, 'not exactly equal');
        expectErrorContaining(matcher, 1, 'not exactly equal');
        expectErrorContaining(matcher, [], 'not exactly equal');
        expectErrorContaining(matcher, {}, 'not exactly equal');
      });

      describe('null', () => {
        const matcher = null;
        it('accepts exactly null', async () => {
          expect(await contract.checkMatch(matcher, null)).toStrictEqual([]);
        });

        expectErrorContaining(matcher, true, 'not null');
        expectErrorContaining(matcher, false, 'not null');
        expectErrorContaining(matcher, '1', 'not null');
        expectErrorContaining(matcher, 'some other string', 'not null');
        expectErrorContaining(matcher, NaN, 'not null');
        expectErrorContaining(matcher, Infinity, 'not null');
        expectErrorContaining(matcher, 1, 'not null');
        expectErrorContaining(matcher, [], 'not null');
        expectErrorContaining(matcher, {}, 'not null');
      });
    });
    describe('array matchers', () => {
      it('accepts an empty array', async () => {
        expect(await contract.checkMatch([], [])).toStrictEqual([]);
      });

      describe.each<any>([
        '',
        1,
        'string',
        '1',
        false,
        true,
        {},
        { a: 'b' },
        Date(),
        () => {},
      ])("when given '%s'", (example) => {
        expectErrorContaining([], example, 'not an array');
      });

      it('accepts an array of exact types', async () => {
        expect(
          await contract.checkMatch(
            [1, 'string', null, true, {}, [], { a: '1' }, [1]],
            [1, 'string', null, true, {}, [], { a: '1' }, [1]]
          )
        ).toStrictEqual([]);
      });

      expectErrorContaining(
        [1, 'string', null],
        [1, 'string', null, true],
        'over the maximum length'
      );

      expectErrorContaining(
        [1, 'string', null, true],
        [1, 'string', null],
        'under the minimum length'
      );

      expectErrorContaining(
        [1, 'string', null, true],
        ['1', 'string', null, true],
        'not exactly equal'
      );

      expectErrorContaining(
        [1, 'string', null, true],
        [1, 'other string', null, true],
        'not exactly equal'
      );

      expectErrorContaining(
        [1, 'string', null, true],
        [1, 'string', false, true],
        'not null'
      );

      expectErrorContaining(
        [1, 'string', null, true],
        [1, 'string', false, false],
        'not exactly equal'
      );

      expectErrorContaining(
        [1, 'string', null, true, {}, [], { a: '1' }, [1]],
        [1, 'string', null, true, [], [], { a: '1' }, [1]],
        'Expected an object'
      );

      expectErrorContaining(
        [1, 'string', null, true, {}, [], { a: '1' }, [1]],
        [1, 'string', null, true, {}, [], { a: '2' }, [1]],
        'not exactly equal'
      );

      expectErrorContaining(
        [1, 'string', null, true, { a: '1' }, [], { a: '1' }, [1]],
        [1, 'string', null, true, {}, [], { a: '1' }, [1]],
        "missing key 'a'"
      );

      expectErrorContaining(
        [1, 'string', null, true, {}, [1], { a: '1' }, [1]],
        [1, 'string', null, true, {}, [], { a: '1' }, [1]],
        'different lengths'
      );

      expectErrorContaining(
        [1, 'string', null, true, {}, [], { a: '1' }, [1]],
        [1, 'string', null, true, {}, [], { a: '1' }, [2]],
        'not exactly equal'
      );

      expectErrorContaining(
        [1, 'string', true, true],
        [1, 'string', true],
        'different lengths'
      );
      expectErrorContaining([1], [], 'different lengths');
      expectErrorContaining([], [1], 'empty array');
    });

    describe('object matchers', () => {
      it('accepts an empty object', async () => {
        expect(await contract.checkMatch({}, {})).toStrictEqual([]);
      });

      describe.each<any>([
        '',
        1,
        'string',
        '1',
        false,
        true,
        [],
        [{}],
        Date(),
        () => {},
      ])("when given '%s'", (example) => {
        expectErrorContaining({}, example, 'Expected an object');
      });
      it('accepts an object of exact types', async () => {
        expect(
          await contract.checkMatch(
            { a: 1, b: 'string', c: null, d: true },
            { a: 1, b: 'string', c: null, d: true }
          )
        ).toStrictEqual([]);
      });

      it('accepts an object that has more keys than expected', async () => {
        expect(
          await contract.checkMatch(
            { a: 1, b: 'string', c: null, d: true },
            { a: 1, b: 'string', c: null, d: true, f: 'extra', g: 0, h: 1 }
          )
        ).toStrictEqual([]);
      });

      expectErrorContaining(
        { a: 1, b: 'string', c: null, d: true },
        { a: '1', b: 'string', c: null, d: true },
        'not exactly equal'
      );

      expectErrorContaining(
        { a: 1, b: 'string', c: null, d: true },
        { a: '1', b: 'string', c: null, d: true },
        'not exactly equal'
      );

      expectErrorContaining(
        { a: 1, b: 'string', c: null, d: true },
        { a: 1, b: 'string', c: false, d: true },
        'is not null'
      );

      expectErrorContaining(
        { a: 1, b: 'string', c: null, d: true },
        { a: 1, b: 'string', c: undefined, d: true },
        'is not null'
      );

      expectErrorContaining(
        { a: 1, b: 'string', c: null, d: true },
        { a: 1, b: 'string', c: null, d: false },
        'not exactly equal'
      );

      describe('with a deeply nested object', () => {
        const deepObject = {
          a: 1,
          b: 'string',
          c: null,
          d: true,
          f: [
            {
              a: 'example',
              b: 'more',
              c: {
                foo: '',
                bar: [
                  [2],
                  [],
                  { examples: { that: { succeed: ['yes', 'it works'] } } },
                ],
              },
            },
          ],
        };

        it('accepts an equal object', async () => {
          expect(
            await contract.checkMatch(deepObject, deepObject)
          ).toStrictEqual([]);
        });

        expectErrorContaining(
          deepObject,
          { a: 1, b: 'string', c: null, d: false },
          "missing key 'f'"
        );

        expectErrorContaining(
          deepObject,
          {
            a: 1,
            b: 'string',
            c: null,
            d: true,
            f: [
              {
                a: 'example',
                b: 'more',
                c: {
                  foo: '',
                  bar: [
                    [2],
                    [],
                    { examples: { that: { succeed: ['no', 'it fails'] } } },
                  ],
                },
              },
            ],
          },
          'not exactly equal'
        );

        expectErrorContaining(
          deepObject,
          {
            a: 1,
            b: 'string',
            c: null,
            d: true,
            f: [
              {
                a: 'example',
                b: 'more',
                c: {
                  foo: '',
                  bar: [[2], [], { examples: { that: {} } }],
                },
              },
            ],
          },
          "missing key 'succeed'"
        );
      });
    });
    describe('array starts with', () => {
      it('accepts an array with extra values', async () => {
        expect(
          await contract.checkMatch(arrayStartsWith([1, 'string', null]), [
            1,
            'string',
            null,
            true,
          ])
        ).toStrictEqual([]);
      });

      expectErrorContaining(
        arrayStartsWith([1, 'string', null]),
        [1, 'other string'],
        'Array has different lengths'
      );
    });
  });
});
