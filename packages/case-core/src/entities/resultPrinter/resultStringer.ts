import {
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
  ResultStringer,
} from './types';

const baseSpaces = 3;

const spaces = (size: number, str: string) => {
  const space = new Array(size + baseSpaces).fill(' ').join('');
  return `${space}${str.replace(/\n/g, `\n${space}`)}`;
};

export const resultStringer: ResultStringer = {
  stringMatchError: ({
    kind,
    message,
    location,
    expected,
    actual,
    locationTag,
    errorTypeTag,
  }: PrintableMatchError): string =>
    `${spaces(0, `${`[${kind}]`}${location}${message}`)}\n${spaces(
      3,
      `Expected something like:\n${spaces(3, expected)}`,
    )}\n${spaces(
      3,
      `Actual:\n${spaces(3, actual)}\n${spaces(
        6,
        `${` - ${locationTag} [${errorTypeTag}]`}`,
      )}`,
    )}\n\n`,
  stringMessageError: ({
    kind,
    location,
    message,
    locationTag,
    errorTypeTag,
  }: PrintableMessageError): string =>
    `${spaces(0, `${`[${kind}] `}${location}${message}`)}\n${spaces(
      3,
      `${` - ${locationTag} [${errorTypeTag}]`}`,
    )}\n\n`,
  stringTestTitle: ({
    icon,
    title,
    additionalText,
  }: PrintableTestTitle): string =>
    spaces(0, `\n${icon} ${title}\n${additionalText}`),
};
