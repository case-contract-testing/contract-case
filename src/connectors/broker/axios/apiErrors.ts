export const API_ERROR = 'BROKER_ERROR';
export const API_NO_RESPONSE = 'BROKER_NO_RESPONSE';
export const API_NOT_AUTHORISED = 'BROKER_NOT_AUTHORISED';

export class BrokerError extends Error {
  code: string;

  constructor(message = 'The broker returned an error', code = API_ERROR) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BrokerError);
    }

    this.name = code;
    this.code = code;
  }
}
