import { versionString } from '../versionString';

export const maintainerLog = (...s: unknown[]): void => {
  if (
    process.env['CASE_CONNECTOR_DEBUG'] != null &&
    process.env['CASE_CONNECTOR_DEBUG'] !== '0' &&
    process.env['CASE_CONNECTOR_DEBUG'] !== 'false'
  ) {
    // eslint-disable-next-line no-console
    console.error(versionString, ...s);
  }
};
