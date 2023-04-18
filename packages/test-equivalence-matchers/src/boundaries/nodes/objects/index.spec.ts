import {
  CoreObjectKeysMatcher,
  CoreObjectValuesMatch,
} from '../../../entities';
import { ObjectEachKeyMatches, ObjectEachValueMatches } from '.';

describe('http matchers', () => {
  it('value matcher compiles', () => {
    const a: CoreObjectValuesMatch = new ObjectEachValueMatches('user');

    expect(a).not.toBeNull();
  });

  it('key  matcher compiles', () => {
    const a: CoreObjectKeysMatcher = new ObjectEachKeyMatches('user');

    expect(a).not.toBeNull();
  });
});
