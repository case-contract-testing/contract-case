// TODO: Move this entire file into the http status code strip function

const validateCodeNumber = (code: number): number => {
  if (code < 100 || code >= 600) {
    throw new Error(
      `HTTP status code '${code}' is outside the valid range (100-599) for status codes`
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
        `'${typeof code}' is not a valid type for an HTTP status code`
      );
  }
};

export const codesToExample = (
  codes: number | string | Array<number | string> | unknown
): number => {
  if (Array.isArray(codes)) {
    if (codes.length === 0) {
      return NaN;
    }
    return codes.map(validateCode)[0];
  }
  return validateCode(codes);
};
