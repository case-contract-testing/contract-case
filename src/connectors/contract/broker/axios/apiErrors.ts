export const API_ERROR = 'API_ERROR';
export const API_NO_RESPONSE = 'API_NO_RESPONSE';
export const API_NOT_FOUND = 'API_NOT_FOUND';
export const API_NOT_AUTHORISED = 'API_NOT_AUTHORISED';

export class ApiError extends Error {
  code: string;

  constructor(message = 'An API error occured', code = API_ERROR) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = code;
    this.code = code;
  }
}
