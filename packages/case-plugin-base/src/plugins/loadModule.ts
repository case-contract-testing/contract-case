import { createRequire } from 'node:module';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { CaseConfigurationError } from '../errors';

/**
 * Resolves a plugin module name against the user's project (ie, the current
 * working directory), falling back to normal resolution relative to this
 * file.
 *
 * The cwd resolution step exists because this code doesn't always run from
 * the user's project: when ContractCase is called from a host language like
 * Java, the connector runs from a temporary directory, so resolving relative
 * to this file would never find plugins the user installed in their project's
 * node_modules.
 *
 * @param moduleName - a previously validated bare module name
 * @returns the resolved path to the module, or null if it couldn't be
 * resolved from the working directory (in which case the caller should fall
 * back to normal resolution, so that this continues to work if the module is
 * resolvable from this file but not from the working directory).
 */
const resolveFromWorkingDirectory = (moduleName: string): string | null => {
  try {
    return createRequire(join(process.cwd(), 'noop.js')).resolve(moduleName);
  } catch {
    return null;
  }
};

/**
 * Loads a plugin module by name, returning whatever the module exports.
 *
 * Module names are validated before loading: they must be bare node package
 * names (optionally scoped, optionally with a subpath). Paths and URIs are
 * intentionally rejected for security reasons - loading a plugin executes
 * its code, and restricting specifiers to already-installed packages means
 * nothing can be loaded that the user didn't explicitly install.
 *
 * Names are resolved against the current working directory (ie, the user's
 * project) first, so plugins are found even when this code runs from
 * somewhere else (eg the connector bundle extracted to a temporary
 * directory).
 *
 * Most callers will want to follow this with {@link mustResolvePlugin} to
 * extract the plugin object from the module contents.
 *
 * @public
 * @param moduleName - the name of the plugin package to load
 * @returns a Promise of the module's contents
 * @throws CaseConfigurationError (as a rejected Promise) if the module name
 * is unsafe or the module couldn't be loaded
 */
export const loadPluginModuleContents = (
  moduleName: string,
): Promise<unknown> =>
  Promise.resolve().then(() => {
    if (
      // Forbid URIs
      moduleName.includes(':') ||
      // Forbid strings that start with '.', as they may be hidden files or path traversal
      moduleName.startsWith('.') ||
      // Forbid strings that start with / , as only local packages are supported
      moduleName.startsWith('/') ||
      // Forbid strings that don't look like node module names
      !/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)*$/i.test(
        moduleName,
      )
    ) {
      throw new CaseConfigurationError(
        `Unsafe plugin module specifier. Plugin names must be a valid local nodejs package name, and may not be remote or inline URIs. Provided name was: '${moduleName}'`,
        'DONT_ADD_LOCATION',
        'INVALID_PLUGIN_NAME',
      );
    }
    const resolvedPath = resolveFromWorkingDirectory(moduleName);
    // webpack ignore is needed here so that the final bundle for host
    // languages is able to import arbitrary libs, without webpack failing
    return import(
      /* webpackIgnore: true */ resolvedPath != null
        ? pathToFileURL(resolvedPath).href
        : moduleName
    )
      .catch((e) => {
        // Some test environments can't do a dynamic import() at all (eg
        // Jest without --experimental-vm-modules). In those environments,
        // fall back to loading the plugin with require() instead.
        if (
          e != null &&
          (e.code === 'ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING' ||
            `${e.message}`.includes('--experimental-vm-modules'))
        ) {
          return createRequire(join(process.cwd(), 'noop.js'))(
            resolvedPath != null ? resolvedPath : moduleName,
          );
        }
        throw e;
      })
      .catch((e) => {
        throw new CaseConfigurationError(
          `Unable to load plugin '${moduleName}': ${e.message}\n\nPlease check that the plugin's package is installed (for example, with \`npm install --save-dev ${moduleName}\`) in the project the tests are running from.`,
          'DONT_ADD_LOCATION',
          'UNDOCUMENTED',
        );
      });
  });
