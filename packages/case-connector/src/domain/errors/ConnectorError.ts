export class ConnectorError extends Error {
  constructor(
    message: string,
    additional = 'This is probably a bug in the wrapper library',
  ) {
    super(`${message}${message.endsWith('.') ? '' : '.'} ${additional}`);
  }
}
