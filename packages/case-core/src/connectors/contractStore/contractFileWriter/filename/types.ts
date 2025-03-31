/**
 * The extension for a ContractCase contract file.
 */
export const EXTENSION = '.case.json' as const;

/**
 * Our maximum filename length for a Case Contract.
 *
 * filenamify recommends the max filename length be 255, but defaults to 100, so
 * we change it
 */
export const MAX_FILENAME_LENGTH = 255 as const;
