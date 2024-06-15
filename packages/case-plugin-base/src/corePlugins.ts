/**
 * DO NOT USE THIS IN YOUR OWN PLUGINS
 *
 * The prefix for ContractCase core plugin names. Plugin names with
 * this prefix are treated as always loaded, log less debug information,
 * and any errors in loading are treated as core crashes rather than user
 * configuration errors.
 *
 * Other than the way logs and load failures are treated, there's no special
 * treatment given to core plugins,
 */
export const CORE_PLUGIN_PREFIX = '_CaseCore:' as const;
