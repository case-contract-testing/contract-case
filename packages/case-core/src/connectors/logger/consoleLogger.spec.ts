/* eslint-disable jest/expect-expect */
import { defaultPrinter } from '../../boundaries/console';
import { makeLogger } from './consoleLogger';

describe('console logger', () => {
  /**
   * These tests don't strictly test anything, they're just here to put examples of the log lines in CI
   */
  const logger = makeLogger(
    {
      '_case:currentRun:context:location': [
        'UnitTest',
        '[logger]',
        ':printing',
      ],
      '_case:currentRun:context:logLevel': 'deepMaintainerDebug',
    },
    defaultPrinter
  );

  it('logs at each log level', () => {
    logger.deepMaintainerDebug('This is a deep maintainer debug log line', {
      with: 'parameters',
    });
    logger.maintainerDebug('This is a maintainer debug log line', {
      with: 'parameters',
    });
    logger.debug('This is a debug log line', {
      with: 'parameters',
    });
    logger.warn('This is a warning log line', {
      with: 'parameters',
    });
    logger.error('This is an error log line', {
      with: 'parameters',
    });
  });
});
