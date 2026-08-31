/**
 * An error with additional properties, used to test matching against the
 * serialised content (errorInternals) of a thrown error. The errorInternals is the error's
 * own enumerable properties, so `code` and `detail` are included.
 */
export class ErrorWithInternals extends Error {
  readonly code: number;

  readonly detail: string;

  constructor(message: string, code: number, detail: string) {
    super(message);
    this.code = code;
    this.detail = detail;
  }
}
