import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import { isContractCasePlugin, mustResolvePlugin } from './resolve';

const makePlugin = (name: string) => ({
  description: {
    humanReadableName: name,
    shortName: name,
    uniqueMachineName: `test:${name}`,
    version: '1.0.0',
  },
  matcherExecutors: {},
  setupMocks: {},
});

describe('isContractCasePlugin', () => {
  it('accepts a well-formed plugin', () => {
    expect(isContractCasePlugin(makePlugin('accepts'))).toBe(true);
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['a string', 'not a plugin'],
    ['an empty object', {}],
    ['a description-only object', { description: makePlugin('d').description }],
    [
      'a plugin with a malformed description',
      { ...makePlugin('m'), description: { humanReadableName: 42 } },
    ],
    [
      'a plugin missing setupMocks',
      { description: makePlugin('s').description, matcherExecutors: {} },
    ],
  ])('rejects %s', (_name, value) => {
    expect(isContractCasePlugin(value)).toBe(false);
  });
});

describe('mustResolvePlugin', () => {
  // The shapes below are what a plugin module's contents look like after
  // loading, depending on how the plugin was packaged and how it was
  // imported. See the comments on each case.

  it('resolves a plugin that is the module contents itself', () => {
    // eg `module.exports = plugin` loaded via require()
    const plugin = makePlugin('direct');
    expect(mustResolvePlugin(plugin, 'direct-plugin')).toBe(plugin);
  });

  it('resolves a plugin under a default property', () => {
    // eg native ESM `export default plugin` loaded via import(), or
    // `module.exports = plugin` loaded via import()
    const plugin = makePlugin('esm');
    expect(mustResolvePlugin({ default: plugin }, 'esm-plugin')).toBe(plugin);
  });

  it('resolves a plugin under two levels of default', () => {
    // eg TypeScript's CommonJS output of `export default plugin`
    // (`exports.default = plugin`) loaded via import(), where the namespace's
    // default is module.exports
    const plugin = makePlugin('ts-cjs');
    expect(
      mustResolvePlugin(
        { __esModule: true, default: { __esModule: true, default: plugin } },
        'ts-cjs-plugin',
      ),
    ).toBe(plugin);
  });

  it('prefers a plugin-shaped module over its default property', () => {
    // A module that both is a plugin and has a default property should not
    // be unwrapped further
    const plugin = { ...makePlugin('outer'), default: makePlugin('inner') };
    expect(
      mustResolvePlugin(plugin, 'named-exports-plugin').description
        .humanReadableName,
    ).toBe('outer');
  });

  it.each([
    ['an empty module', {}],
    ['a module with a non-plugin default', { default: { some: 'data' } }],
    ['null module contents', null],
    [
      'a deeply nested plugin beyond the unwrap depth',
      {
        default: { default: { default: { default: makePlugin('too-deep') } } },
      },
    ],
  ])('throws a CaseConfigurationError for %s', (_name, moduleContents) => {
    expect(() => mustResolvePlugin(moduleContents, 'bad-plugin')).toThrow(
      CaseConfigurationError,
    );
    expect(() => mustResolvePlugin(moduleContents, 'bad-plugin')).toThrow(
      "The module 'bad-plugin' was loaded, but it doesn't contain a ContractCase plugin",
    );
  });
});
