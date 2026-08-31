const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object';

/**
 * The standard Error properties that are not part of the error internals.
 * These are excluded from the errorInternals so that only user-defined properties
 * of the thrown error are serialised (mirrors the Java wrapper, which strips
 * the standard Throwable properties).
 */
const STANDARD_ERROR_PROPERTIES = ['name', 'message', 'stack', 'cause'];

/**
 * Serialises the user-defined content of a thrown error. This is the error's
 * own enumerable properties, excluding the standard Error properties.
 */
const errorInternalsOf = (error: unknown): unknown => {
  if (!isObject(error)) {
    return error;
  }
  return Object.fromEntries(
    Object.entries(error).filter(
      ([key]) => !STANDARD_ERROR_PROPERTIES.includes(key),
    ),
  );
};

const errorClassName = (error: unknown): string => {
  if (isObject(error) && typeof error.constructor?.name === 'string') {
    return error.constructor.name;
  }
  return typeof error;
};

const errorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.message;
  }
  return error == null ? undefined : String(error);
};

/**
 * Maps an error thrown by a user-provided function into the function failure
 * result expected by the core's FunctionResultMatcher.
 */
export const mapThrownError = (error: unknown): string =>
  JSON.stringify({
    errorClassName: errorClassName(error),
    message: errorMessage(error),
    stack: error instanceof Error ? error.stack : undefined,
    errorInternals: errorInternalsOf(error),
  });
