export class ContractCaseExpectationsNotMet extends Error {
  constructor(message: string, userFacingStacktrace: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'ContractCaseExpectationsNotMet';

    if (userFacingStacktrace != null && userFacingStacktrace !== '') {
      this.stack = userFacingStacktrace.startsWith('CaseConfigurationError')
        ? `Contract${userFacingStacktrace}`
        : userFacingStacktrace;
    }
  }
}
