import {
  And,
  ChangeLogLevel,
  NamedMatch,
  ReferenceMatch,
  StateVariable,
  WithExample,
} from '.';
import {
  CASCADING_CONTEXT_MATCHER_TYPE,
  CONTEXT_VARIABLE_TYPE,
  CoreAndCombinationMatcher,
  CoreContextVariableMatcher,
  LookupableMatcher,
} from '../../../entities';
import { AnyString } from '../strings';

describe('convenience matchers', () => {
  it('LogLevel matcher serialises', () => {
    expect(
      JSON.parse(JSON.stringify(new ChangeLogLevel('warn', true)))
    ).toEqual({
      'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      'case:matcher:child': true,
      'case:currentRun:context:logLevel': 'warn',
    });
  });

  it('state variable matcher compiles', () => {
    const a: CoreContextVariableMatcher = new StateVariable('someName');

    expect(a).not.toBeNull();
  });

  it('state variable matcher serialises', () => {
    expect(JSON.parse(JSON.stringify(new StateVariable('someName')))).toEqual({
      'case:matcher:type': CONTEXT_VARIABLE_TYPE,
      'case:matcher:variableName': 'someName',
    });
  });

  it('with example matcher serialises', () => {
    expect(
      JSON.parse(JSON.stringify(new WithExample(new AnyString('bar'), 'foo')))
    ).toEqual({
      'case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      'case:matcher:child': {
        'case:context:matchBy': 'type',
        'case:matcher:example': 'bar',
        'case:matcher:resolvesTo': 'string',
        'case:matcher:type': 'case:MatchString',
      },
      'case:matcher:example': 'foo',
    });
  });

  it('Named matcher compiles', () => {
    const a: LookupableMatcher = new NamedMatch('someName', true);

    expect(a).not.toBeNull();
  });

  it('Reference matcher compiles', () => {
    const a: LookupableMatcher = new ReferenceMatch('someName');

    expect(a).not.toBeNull();
  });

  it('And matcher compiles', () => {
    const a: CoreAndCombinationMatcher = new And(['someName', 'otherName']);

    expect(a).not.toBeNull();
  });
});
