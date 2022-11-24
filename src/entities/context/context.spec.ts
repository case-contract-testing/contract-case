import { locationString } from './context';
import type { LoggableContext } from './types';

const mockContextWithLocation = (location: string[]) =>
  ({
    // This is a little dirty, as the test really shouldn't know the structure
    // This should be fixed later
    'case:currentRun:context:location': location,
  } as LoggableContext);

describe('location string function', () => {
  it.each([
    [[], ''],
    [['test', '[1]'], 'test[1]'],
    [['test', '[1]', 'some', 'property'], 'test[1].some.property'],
    [
      ['test', '[1]', 'some', '[named]', 'property'],
      'test[1].some[named].property',
    ],
  ])(
    "given the location '%p' it produces %s",
    (location: string[], expected: string) => {
      expect(locationString(mockContextWithLocation(location))).toBe(expected);
    }
  );
});
