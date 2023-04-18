import { AnyNumber, AnyBoolean, AnyInteger, AnyNull } from '.';
import {
  BooleanMatcher,
  CoreIntegerMatch,
  NullMatcher,
  NumberMatcher,
} from '../../../entities';

describe('primitive matchers', () => {
  it('boolean matcher compiles', () => {
    const a: BooleanMatcher = new AnyBoolean(true);

    expect(a).not.toBeNull();
  });

  it('number matcher compiles', () => {
    const a: NumberMatcher = new AnyNumber(1);

    expect(a).not.toBeNull();
  });

  it('integer matcher compiles', () => {
    const a: CoreIntegerMatch = new AnyInteger(1);

    expect(a).not.toBeNull();
  });

  it('null matcher compiles', () => {
    const a: NullMatcher = new AnyNull();

    expect(a).not.toBeNull();
  });
});
