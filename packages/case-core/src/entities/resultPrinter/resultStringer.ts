import {
  PrintableMatchError,
  PrintableMessageError,
  PrintableTestTitle,
  ResultStringer,
} from './types';

const spaces = (size: number, str: string) => {
  const space = new Array(size).fill(' ').join('');
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
    // This is done as one line to prevent it splitting when multiple tests are running
    `${spaces(6, `${` ${kind} `} ${location} ${message}`)}\n${spaces(
      9,
      `Expected something like:\n${spaces(3, expected)}`,
    )}\n${spaces(
      9,
      `Actual:\n${spaces(3, actual)}\n\n${spaces(
        12,
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
    // This is done as one line to prevent it splitting when multiple tests are running
    `${spaces(6, `${` ${kind} `} ${location} ${message}`)}\n\n${spaces(
      12,
      `${` - ${locationTag} [${errorTypeTag}]`}`,
    )}\n\n`,
  stringTestTitle: ({
    icon,
    title,
    additionalText,
  }: PrintableTestTitle): string =>
    // This is done as one line to prevent it splitting when multiple tests are running
    spaces(3, `\n${icon} ${title}\n${additionalText}`),
};
