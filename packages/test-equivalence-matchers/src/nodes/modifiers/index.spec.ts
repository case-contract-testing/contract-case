import { CASCADING_CONTEXT_MATCHER_TYPE } from '@contract-case/case-entities-internal';
import { ExactlyLike, ShapedLike } from '.';
import { AnyString } from '../strings';

describe('modifying matchers', () => {
  it('shaped-like matcher serialises', () => {
    expect(JSON.parse(JSON.stringify(new ShapedLike(true)))).toEqual({
      '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      '_case:matcher:child': true,
      '_case:context:matchBy': 'type',
    });

    expect(
      JSON.parse(JSON.stringify(new ShapedLike(new AnyString('foo'))))
    ).toEqual({
      '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      '_case:matcher:child': {
        '_case:context:matchBy': 'type',
        '_case:matcher:example': 'foo',
        '_case:matcher:resolvesTo': 'string',
        '_case:matcher:type': '_case:MatchString',
      },
      '_case:context:matchBy': 'type',
    });
  });

  it('exactly-like matcher serialises', () => {
    expect(JSON.parse(JSON.stringify(new ExactlyLike(true)))).toEqual({
      '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      '_case:matcher:child': true,
      '_case:context:matchBy': 'exact',
    });

    expect(
      JSON.parse(JSON.stringify(new ExactlyLike(new AnyString('foo'))))
    ).toEqual({
      '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      '_case:matcher:child': {
        '_case:context:matchBy': 'type',
        '_case:matcher:example': 'foo',
        '_case:matcher:resolvesTo': 'string',
        '_case:matcher:type': '_case:MatchString',
      },
      '_case:context:matchBy': 'exact',
    });
  });
});
