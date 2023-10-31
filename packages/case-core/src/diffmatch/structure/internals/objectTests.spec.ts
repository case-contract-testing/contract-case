import { isObject, whyNotAnObject } from './objectTests';

describe('isObject', () => {
  describe('function', () => {
    const f = () => {};
    it('fails', () => {
      expect(isObject(f)).toBeFalsy();
    });

    it('has the appropriate message', () => {
      expect(whyNotAnObject(f)).toBe(
        "Expected an object, but the type was 'function' instead",
      );
    });
  });
  describe('null', () => {
    const e = null;
    it('fails', () => {
      expect(isObject(e)).toBeFalsy();
    });

    it('has the appropriate message', () => {
      expect(whyNotAnObject(e)).toBe(
        'Expected an object, but it was null or undefined',
      );
    });
  });

  describe('undefined', () => {
    const e = undefined;
    it('fails', () => {
      expect(isObject(e)).toBeFalsy();
    });

    it('has the appropriate message', () => {
      expect(whyNotAnObject(e)).toBe(
        'Expected an object, but it was null or undefined',
      );
    });
  });

  describe('array', () => {
    const e = [{}, {}];
    it('fails', () => {
      expect(isObject(e)).toBeFalsy();
    });

    it('has the appropriate message', () => {
      expect(whyNotAnObject(e)).toBe('Expected an object, but it was an array');
    });
  });

  describe('non object', () => {
    const e = [{}, {}];
    it('fails', () => {
      expect(isObject(e)).toBeFalsy();
    });

    it('has the appropriate message', () => {
      expect(whyNotAnObject(e)).toBe('Expected an object, but it was an array');
    });
  });

  describe('object', () => {
    const e = {};
    it('passes', () => {
      expect(isObject(e)).toBeTruthy();
    });

    it('has the appropriate message', () => {
      expect(
        whyNotAnObject(e).startsWith(
          'If you are seeing this message, there is a bug',
        ),
      ).toBeTruthy();
    });
  });
});
