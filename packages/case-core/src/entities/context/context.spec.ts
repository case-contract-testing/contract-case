import { locationString } from './context';
import type { DataContext } from './types';

describe('location string function', () => {
  describe('with maintainerDebug', () => {
    const mockContextWithLocation = (location: string[]) =>
      ({
        // This is a little dirty, as the test really shouldn't know the structure
        // This should be fixed later
        '_case:currentRun:context:logLevel': 'maintainerDebug',
        '_case:currentRun:context:location': location,
      }) as DataContext;
    it.each([
      [[], ''],
      [['test', '[1]'], 'test[1]'],
      [['test', '[1]', 'some', 'property'], 'test[1].some.property'],
      [
        ['test', '[1]', 'some', '[named]', 'property'],
        'test[1].some[named].property',
      ],
      [
        ['test', '[1]', ':some', ':[named]', ':property', 'foo'],
        'test[1]:some:[named]:property.foo',
      ],
    ])(
      "given the location '%p' it produces %s",
      (location: string[], expected: string) => {
        expect(locationString(mockContextWithLocation(location))).toBe(
          expected,
        );
      },
    );
  });

  describe('without maintainerDebug', () => {
    const mockContextWithLocation = (location: string[]) =>
      ({
        // This is a little dirty, as the test really shouldn't know the structure
        // This should be fixed later
        '_case:currentRun:context:logLevel': 'debug',
        '_case:currentRun:context:location': location,
      }) as DataContext;
    it.each([
      [[], ''],
      [['test', '[1]'], 'test[1]'],
      [['test', '[1]', 'some', 'property'], 'test[1].some.property'],
      [
        ['test', '[1]', 'some', '[named]', 'property'],
        'test[1].some[named].property',
      ],
      [['test', '[1]', ':some', ':[named]', ':property', 'foo'], 'test[1].foo'],
    ])(
      "given the location '%p' it produces %s",
      (location: string[], expected: string) => {
        expect(locationString(mockContextWithLocation(location))).toBe(
          expected,
        );
      },
    );
  });
});
