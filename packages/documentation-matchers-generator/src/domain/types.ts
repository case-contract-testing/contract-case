export type Writer = {
  writeLine: (line?: string) => void;
  close: () => void;
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

export type Parameter = {
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
  languageName: string;
  languageDisplayName: string;
  example: string;
  parameters: Parameter[];
  className: string;
};
