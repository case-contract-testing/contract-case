import filenamify from 'filenamify';
import slug from 'slug';
import { MAX_FILENAME_LENGTH } from '../types';
import { ContractData } from '../../../../../entities/types';

const SLUG_CONFIG = {
  ...slug.defaults.modes.pretty,
  // This exists so that we preserve `_` in strings we want to slug
  charmap: { ...slug.defaults.modes.pretty.charmap, _: '_' },
};

const customSlug = (toSlug: string) => slug(toSlug, SLUG_CONFIG);

const escapeFileName = (pathString: string) =>
  filenamify(pathString, { maxLength: MAX_FILENAME_LENGTH });

export const providerSlug = (contract: ContractData): string =>
  escapeFileName(customSlug(contract.description.providerName));

export const consumerSlug = (contract: ContractData): string =>
  escapeFileName(customSlug(contract.description.consumerName));
