import {
  CaseConfigurationError,
  ContractCasePlugin,
  IsCaseNodeForType,
  IsMockDescriptorForType,
} from '@contract-case/case-plugin-base';

/**
 * Convenience type for a plugin where the specific matcher and mock types
 * aren't known - which is the case when a plugin has been loaded dynamically.
 *
 * @public
 */
export type AnyContractCasePlugin = ContractCasePlugin<
  string,
  string,
  IsCaseNodeForType<string>,
  IsMockDescriptorForType<string>,
  unknown
>;

/**
 * Type guard that determines whether an unknown value is shaped like a
 * {@link ContractCasePlugin}.
 *
 * Note that this only validates the shape of the plugin object - it
 * doesn't confirm that the executors themselves are correctly implemented.
 *
 * @public
 * @param value - the value to check
 * @returns true if the value has the shape of a ContractCase plugin
 */
export const isContractCasePlugin = (
  value: unknown,
): value is AnyContractCasePlugin => {
  if (value == null || typeof value !== 'object') {
    return false;
  }
  const candidate = value as Partial<AnyContractCasePlugin>;
  return (
    candidate.description != null &&
    typeof candidate.description === 'object' &&
    typeof candidate.description.humanReadableName === 'string' &&
    typeof candidate.description.shortName === 'string' &&
    typeof candidate.description.uniqueMachineName === 'string' &&
    typeof candidate.description.version === 'string' &&
    candidate.matcherExecutors != null &&
    typeof candidate.matcherExecutors === 'object' &&
    candidate.setupMocks != null &&
    typeof candidate.setupMocks === 'object'
  );
};

/**
 * Depending on how a plugin module was packaged (ESM `export default`,
 * CommonJS `module.exports = plugin`, or transpiled variants of either), the
 * plugin object may be the module contents itself, or nested under one or
 * two levels of `default`. This walks down until it finds something
 * plugin-shaped.
 */
const unwrapModuleContents = (
  candidate: unknown,
  remainingDepth: number,
): unknown =>
  isContractCasePlugin(candidate) ||
  remainingDepth <= 0 ||
  candidate == null ||
  typeof candidate !== 'object' ||
  !('default' in candidate)
    ? candidate
    : unwrapModuleContents(
        (candidate as { default: unknown }).default,
        remainingDepth - 1,
      );

/**
 * Extracts the {@link ContractCasePlugin} object from the contents of a
 * dynamically loaded plugin module, or throws a `CaseConfigurationError` if
 * the module doesn't contain one.
 *
 * Plugin packages are documented as exporting the assembled plugin object as
 * their default export - but depending on the module system the plugin was
 * built with (and the module system doing the importing), the plugin object
 * may arrive as the module contents itself, as the module namespace's
 * `default` property, or nested a level deeper (eg TypeScript's CommonJS
 * output of `export default`, imported as ESM). This function accepts all of
 * these shapes, so plugin authors don't need to know the details.
 *
 * @public
 * @param moduleContents - whatever `import()` (or `require`) returned for the plugin module
 * @param moduleName - the name of the module, for error messages
 * @returns the plugin object
 * @throws CaseConfigurationError if no plugin-shaped object could be found
 */
export const mustResolvePlugin = (
  moduleContents: unknown,
  moduleName: string,
): AnyContractCasePlugin => {
  // Two levels of unwrapping is enough for every known packaging style;
  // the third level is headroom for a transpiler wrapping a wrapped module.
  const candidate = unwrapModuleContents(moduleContents, 3);
  if (!isContractCasePlugin(candidate)) {
    throw new CaseConfigurationError(
      `The module '${moduleName}' was loaded, but it doesn't contain a ContractCase plugin. Plugin modules must export the assembled plugin object (an object with 'description', 'matcherExecutors' and 'setupMocks' properties) as the module's default export. Please check that '${moduleName}' really is a ContractCase plugin, and that its name is spelled correctly. If it is a plugin, this is an error in the plugin's packaging - please contact the plugin's authors.`,
      'DONT_ADD_LOCATION',
      'INVALID_PLUGIN_MODULE',
    );
  }
  return candidate;
};
