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
  documentation: string,
  name: string,
  parameterName: string,
): string => {
  if (!documentation) {
    // eslint-disable-next-line no-console
    console.log(
      `WARN (${name}): Parameter '${parameterName}' has no documentation`,
    );
    return '';
  }

  return documentation;
};
