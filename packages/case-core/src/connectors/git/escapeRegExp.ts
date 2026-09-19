/*!
 * Derived from git-rev-sync (https://github.com/kurttheviking/git-rev-sync-js)
 * Copyright (c) 2014 - Present Kurt Ericson
 * MIT licensed - see the LICENSE file in this directory.
 */
/**
 * Escapes characters with special meaning either inside or outside character
 * sets, so that `str` can be embedded in a regular expression literally.
 *
 * `-` uses a `\xnn` escape because the simpler form is disallowed by the
 * stricter grammar of Unicode patterns.
 *
 * @param str - the string to escape
 * @returns the escaped string
 */
export const escapeRegExp = (str: string): string =>
  str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
