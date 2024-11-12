import { TypeDisplayFormat } from '../types.js';

const renderTarget = (target: string) => {
  if (target.startsWith('matchers.')) {
    return target.replaceAll('.', '/').replace('matchers', '..');
  }
  return target;
};

/**
 * Replaces tsdoc links in the given string with markdown links
 *
 * @param input - the input string to look for `@link` elements in
 * @returns the same string, but with the links replaced with `[link]()` style links
 */
export const replaceTsDocLinks = (input: string): string => {
  const linkRegex = /{@link\s+([^|}\s]+)(?:\s*\|?\s*([^}]+))?}/gm;

  return input
    .replaceAll('} *', ' ') // work around https://github.com/cdklabs/jsii-docgen/issues/1633
    .replace(linkRegex, (_match, target, text) => {
      const linkText = !text || text.trim().length === 0 ? target : text; // Use target as the text if no text is provided

      return `[${linkText.replaceAll('\n', ' ')}](${renderTarget(target).replaceAll('\n', ' ')})`;
    });
};

/**
 * Formats a type from jsii's documentation output format
 */
export const formatDisplayType = (pattern: TypeDisplayFormat): string => {
  if ('id' in pattern) {
    // TODO: Make this a link
    return `${pattern.submodule}.${pattern.displayName}`;
  }

  const replacements = (pattern.types ?? []).map(formatDisplayType);
  return replacements.reduce(
    (acc, curr) => acc.replace('%', curr),
    pattern.formattingPattern,
  );
};

/** Formats the description of a parameter */
export const formatParameterDescription = (
  docs: { summary?: string; remarks?: string },
  name: string,
  parameterName: string,
): string => {
  if (!('summary' in docs) || !docs.summary) {
    console.log(
      `WARN (${name}): Parameter '${parameterName}' has no documentation`,
    );
    return '';
  }
  const summary = replaceTsDocLinks(docs.summary.replace(/^- /, '')).replaceAll(
    '\n',
    '<br/>',
  );
  const remarks = docs.remarks
    ? `<br/>${replaceTsDocLinks(docs.remarks).replaceAll('\n', '<br/>')}`
    : '';

  return `${summary}${remarks}`;
};
