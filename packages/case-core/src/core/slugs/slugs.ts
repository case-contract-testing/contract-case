import filenamify from 'filenamify';
import slug from 'slug';
import { ContractData } from '../../entities/types';
import { MAX_FILENAME_LENGTH } from '../../entities';

const SLUG_CONFIG = {
  ...slug.defaults.modes.pretty,
  // This exists so that we preserve `_` in strings we want to slug
  charmap: { ...slug.defaults.modes.pretty.charmap, _: '_' },
};

const customSlug = (toSlug: string) => slug(toSlug, SLUG_CONFIG);

const escapeFileName = (pathString: string) =>
  filenamify(pathString, { maxLength: MAX_FILENAME_LENGTH });

/**
 * Normalises a provider name to a slug safe for the file system.
 *
 * This is in the core package, because we don't want this behaviour
 * to change based on the filesystem, and because the verification
 * result types need it.
 */
export const providerSlug = (contract: ContractData): string =>
  escapeFileName(customSlug(contract.description.providerName));

/**
 * Normalises a consumer name to a slug safe for the file system
 *
 * This is in the core package, because we don't want this behaviour
 * to change based on the filesystem, and because the verification
 * result types need it.
 */
export const consumerSlug = (contract: ContractData): string =>
  escapeFileName(customSlug(contract.description.consumerName));
