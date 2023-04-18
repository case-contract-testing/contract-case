import {
  CASCADING_CONTEXT_MATCHER_TYPE,
  CONTEXT_VARIABLE_TYPE,
  CoreAndCombinationMatcher,
  CoreContextVariableMatcher,
  LookupableMatcher,
} from '@contract-case/case-entities-internal';
import {
  And,
  ChangeLogLevel,
  NamedMatch,
  ReferenceMatch,
  StateVariable,
  WithExample,
} from '.';
import { AnyString } from '../strings';

describe('convenience matchers', () => {
  it('LogLevel matcher serialises', () => {
    expect(
      JSON.parse(JSON.stringify(new ChangeLogLevel('warn', true)))
    ).toEqual({
      '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      '_case:matcher:child': true,
      '_case:currentRun:context:logLevel': 'warn',
    });
  });

  it('state variable matcher compiles', () => {
    const a: CoreContextVariableMatcher = new StateVariable('someName');

    expect(a).not.toBeNull();
  });

  it('state variable matcher serialises', () => {
    expect(JSON.parse(JSON.stringify(new StateVariable('someName')))).toEqual({
      '_case:matcher:type': CONTEXT_VARIABLE_TYPE,
      '_case:matcher:variableName': 'someName',
    });
  });

  it('with example matcher serialises', () => {
    expect(
      JSON.parse(JSON.stringify(new WithExample(new AnyString('bar'), 'foo')))
    ).toEqual({
      '_case:matcher:type': CASCADING_CONTEXT_MATCHER_TYPE,
      '_case:matcher:child': {
        '_case:context:matchBy': 'type',
        '_case:matcher:example': 'bar',
        '_case:matcher:resolvesTo': 'string',
        '_case:matcher:type': 'case:MatchString',
      },
      '_case:matcher:example': 'foo',
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
