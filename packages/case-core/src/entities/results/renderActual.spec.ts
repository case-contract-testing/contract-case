import { actualToString } from './renderActual';

describe('render actual', () => {
  it.each([['some string', '"some string"']])(
    'renders %s as %s',
    (input, expected) => {
      expect(actualToString(input)).toBe(expected);
    }
  );
});
