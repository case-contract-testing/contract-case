import { ExactlyLike, ShapedLike } from '.';
import { CASCADING_CONTEXT_MATCHER_TYPE } from '../../../entities';
import { AnyString } from '../strings';

describe('modifying matchers', () => {
  it('shaped-like matcher serialises', () => {
    expect(JSON.parse(JSON.stringify(new ShapedLike(true)))).toEqual({
      'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      'case:matcher:child': true,
      'case:context:matchBy': 'type',
    });

    expect(
      JSON.parse(JSON.stringify(new ShapedLike(new AnyString('foo'))))
    ).toEqual({
      'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      'case:matcher:child': {
        'case:context:matchBy': 'type',
        'case:matcher:example': 'foo',
        'case:matcher:resolvesTo': 'string',
        'case:matcher:type': 'case:MatchString',
      },
      'case:context:matchBy': 'type',
    });
  });

  it('exactly-like matcher serialises', () => {
    expect(JSON.parse(JSON.stringify(new ExactlyLike(true)))).toEqual({
      'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      'case:matcher:child': true,
      'case:context:matchBy': 'exact',
    });

    expect(
      JSON.parse(JSON.stringify(new ExactlyLike(new AnyString('foo'))))
    ).toEqual({
      'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      'case:matcher:child': {
        'case:context:matchBy': 'type',
        'case:matcher:example': 'foo',
        'case:matcher:resolvesTo': 'string',
        'case:matcher:type': 'case:MatchString',
      },
      'case:context:matchBy': 'exact',
    });
  });
});
