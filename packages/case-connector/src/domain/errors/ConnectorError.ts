/**
 * The ConnectorError indicates a fatal error during execution of the connector.
 * It's distinct from CaseCoreError because it indicates a failure in the
 * connector, which may not be the connector's fault.
 */
export class ConnectorError extends Error {
  constructor(
    message: string,
    additional = 'This is probably a bug in the wrapper library',
  ) {
    super(`${message}${message.endsWith('.') ? '' : '.'} ${additional}`);
  }
}
