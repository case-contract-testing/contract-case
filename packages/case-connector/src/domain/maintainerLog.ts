import { LogLevel } from '@contract-case/case-core';
import { versionString } from '../versionString.js';

export const connectorDebugLog = (
  logLevel: LogLevel,
  ...s: unknown[]
): void => {
  if (logLevel === 'none') {
    return;
  }

  const connectorDebug = (
    process.env['CASE_CONNECTOR_DEBUG'] ?? ''
  ).toLowerCase();

  if (
    connectorDebug == null ||
    connectorDebug === '0' ||
    connectorDebug === 'false' ||
    connectorDebug === ''
  ) {
    return;
  }
  if (
    logLevel === 'deepMaintainerDebug' &&
    !(
      connectorDebug === 'deep' ||
      connectorDebug === 'deepMaintainer' ||
      connectorDebug === 'deepMaintainerDebug'
    )
  ) {
    return;
  }
  // eslint-disable-next-line no-console
  console.error(versionString, ...s);
};

export const maintainerLog = (...s: unknown[]): void =>
  connectorDebugLog('maintainerDebug', ...s);
