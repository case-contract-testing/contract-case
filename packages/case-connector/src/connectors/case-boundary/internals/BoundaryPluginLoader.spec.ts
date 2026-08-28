import { describe, expect, it } from 'vitest';

import { BoundaryPluginLoader } from './BoundaryPluginLoader.js';
import {
  BoundaryFailure,
  BoundaryResult,
  BoundaryResultTypeConstants,
  BoundarySuccess,
  ContractCaseBoundaryConfig,
  ILogPrinter,
  IResultPrinter,
} from './boundary/index.js';

const logPrinter: ILogPrinter = {
  log: () => Promise.resolve(new BoundarySuccess()),
};

const resultPrinter: IResultPrinter = {
  printMatchError: () => Promise.resolve(new BoundarySuccess()),
  printMessageError: () => Promise.resolve(new BoundarySuccess()),
  printTestTitle: () => Promise.resolve(new BoundarySuccess()),
};

const config: ContractCaseBoundaryConfig = {
  testRunId: 'PLUGIN-LOADER-SPEC',
  internals: {},
};

const makeLoader = () =>
  new BoundaryPluginLoader(config, logPrinter, resultPrinter, [
    'plugin-loader-spec-version',
  ]);

const expectSuccess = (result: BoundaryResult) => {
  expect(
    result.resultType,
    result instanceof BoundaryFailure ? result.message : undefined,
  ).toBe(BoundaryResultTypeConstants.RESULT_SUCCESS);
};

const expectFailure = (result: BoundaryResult): BoundaryFailure => {
  expect(result.resultType).toBe(BoundaryResultTypeConstants.RESULT_FAILURE);
  return result as BoundaryFailure;
};

describe('BoundaryPluginLoader', () => {
  // The fixture package provides the same minimal plugin behind one entry
  // point per packaging style a real plugin might be built with. The
  // documented shape is "the plugin object is the module's default export" -
  // all of these must load.
  describe.each([
    [
      'TypeScript-compiled default export',
      '@contract-case/test-plugin-fixture',
    ],
    [
      'CommonJS module.exports',
      '@contract-case/test-plugin-fixture/module-exports',
    ],
    [
      'native ESM default export',
      '@contract-case/test-plugin-fixture/esm-default',
    ],
    [
      'CommonJS named exports',
      '@contract-case/test-plugin-fixture/named-exports',
    ],
  ])('with a plugin packaged as %s', (_style, moduleName) => {
    it('loads successfully', async () => {
      expectSuccess(await makeLoader().loadPlugins([moduleName]));
    });

    it('is idempotent when loaded again', async () => {
      expectSuccess(await makeLoader().loadPlugins([moduleName]));
    });
  });

  describe('with a module that loads but is not a plugin', () => {
    it('fails with a message explaining the expected shape', async () => {
      const failure = expectFailure(
        await makeLoader().loadPlugins([
          '@contract-case/test-plugin-fixture/not-a-plugin',
        ]),
      );
      expect(failure.message).toContain(
        "doesn't contain a ContractCase plugin",
      );
      expect(failure.message).toContain(
        '@contract-case/test-plugin-fixture/not-a-plugin',
      );
      expect(failure.contractCaseErrorCode).toBe('INVALID_PLUGIN_MODULE');
    });
  });

  describe('with a package that is not installed', () => {
    it('fails and suggests installing the package', async () => {
      const failure = expectFailure(
        await makeLoader().loadPlugins([
          '@contract-case/definitely-not-a-real-plugin',
        ]),
      );
      expect(failure.message).toContain(
        "Unable to load plugin '@contract-case/definitely-not-a-real-plugin'",
      );
      expect(failure.message).toContain('npm install');
    });
  });

  describe.each([
    ['a remote URI', 'https://example.com/evil.js'],
    ['an inline URI', 'data:text/javascript,export default {}'],
    ['a relative path', './some/local/path'],
    ['a path traversal', '../../../etc/passwd'],
    ['an absolute path', '/etc/passwd'],
    ['a non-package string', 'not a package name'],
  ])('with an unsafe module specifier (%s)', (_kind, moduleName) => {
    it('fails without attempting to load it', async () => {
      const failure = expectFailure(
        await makeLoader().loadPlugins([moduleName]),
      );
      expect(failure.message).toContain('Unsafe plugin module specifier');
      expect(failure.contractCaseErrorCode).toBe('INVALID_PLUGIN_NAME');
    });
  });

  describe('with a mix of loadable and unloadable plugins', () => {
    it('fails, reporting the plugin that could not be loaded', async () => {
      const failure = expectFailure(
        await makeLoader().loadPlugins([
          '@contract-case/test-plugin-fixture/module-exports',
          '@contract-case/definitely-not-a-real-plugin',
        ]),
      );
      expect(failure.message).toContain(
        '@contract-case/definitely-not-a-real-plugin',
      );
    });
  });
});
