import { LanguageGenerator } from '../../types';

export type ContentWriter = {
  writeLine: (line?: string) => void;
  toContent: () => string;
};

export type TypeDisplayFormat =
  | {
      formattingPattern: string;
      types?: TypeDisplayFormat[];
    }
  | {
      id: string;
      displayName: string;
      fqn: string;
      packageName: string;
      packageVersion: string;
      submodule: string;
    };

export type Summary = { summary?: string; remarks?: string };

export type ParameterDoc = {
  displayName: string;
  type: TypeDisplayFormat;
  docs: Summary;
};

export type MatcherDoc = {
  className: string;
  summary: string;
  remarks: string | undefined;
  module: string;
  languages: Array<LanguageDetails>;
};

export type LanguageDetails = {
  /** The name of this language for markdown, used for syntax highlighting */
  languageMarkdownName: string;
  /** The display name of this langauge */
  languageDisplayName: string;
  /** The generator for this language */
  generator: LanguageGenerator;
};
