import { TypeDisplayFormat } from '../types.js';

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
  displayName: string,
): string => {
  if (!('summary' in docs) || !docs.summary) {
    console.log(
      `WARN (${name}): Parameter '${displayName}' has no documentation`,
    );
    return '';
  }
  const summary = docs.summary.replace(/^- /, '').replaceAll('\n', '<br/>');
  const remarks = docs.remarks
    ? `<br/>${docs.remarks.replaceAll('\n', '<br/>')}`
    : '';

  return `${summary}${remarks}`;
};
