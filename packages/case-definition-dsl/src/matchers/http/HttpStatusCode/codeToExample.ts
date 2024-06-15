// TODO: Move this entire file into the http status code strip function

const validateCodeNumber = (code: number): number => {
  if (code < 100 || code >= 600) {
    throw new Error(
      `HTTP status code '${code}' is outside the valid range (100-599) for status codes`,
    );
  }
  if (Math.abs(code) !== code) {
    throw new Error(`HTTP status code '${code}' must be a whole integer`);
  }
  return code;
};

const validateCode = (code: number | string | unknown): number => {
  switch (typeof code) {
    case 'number':
      return validateCodeNumber(code);
    case 'string':
      return validateCodeNumber(Number.parseInt(code.replace(/X|x/g, '0'), 10));
    default:
      throw new Error(
        `'${typeof code}' is not a valid type for an HTTP status code`,
      );
  }
};
/**
 * Converts a description of an HTTP code into a specific example. If a class of
 * codes (eg 2XX) is specified, the X's are converted to 0. If an array is passed, the first entry is used.
 * @param codes - Either a number, string, or an array of numbers or strings for
 * HTTP status codes. 401, '404' and '4XX' are all valid.
 * @returns A single example as a number
 */

export const codesToExample = (
  codes: number | string | Array<number | string> | unknown,
): number => {
  if (Array.isArray(codes)) {
    if (codes.length === 0) {
      return NaN;
    }
    return codes.map(validateCode)[0];
  }
  return validateCode(codes);
};
