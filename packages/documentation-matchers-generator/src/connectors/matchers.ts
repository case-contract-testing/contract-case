import java from '@contract-case/case-definition-dsl/docs-json/java.json' with { type: 'json' };
import ts from '@contract-case/case-definition-dsl/docs-json/typescript.json' with { type: 'json' };

import { MatcherDoc, Parameter } from '../domain/types.js';

const IGNORED_CLASS = 'IgnoreThisClass';

export type SingleLanguageMatcher = {
  className: string;
  languageName: string;
  languageDisplayName: string;
  summary: string;
  remarks: string | undefined;
  example: string;
  module: string;
  parameters: Array<Parameter>;
};

const extractModule = (id: string) => {
  const match = id.match(/\.matchers\.(\w+)\./);
  if (!match || match.length < 2) {
    throw new Error(
      `FATAL: Unable to extract module from id: ${id}\n  Please check the generated documentation json`,
    );
  }
  if (match[1] == null) {
    throw new Error(
      `FATAL: Match was null when extracting module from id: ${id}\n  Please check the generated documentation json`,
    );
  }
  return match[1];
};

const javaMatchers: Record<string, SingleLanguageMatcher> =
  java.apiReference.classes
    .filter((classDoc) => classDoc.id.includes('matcher'))
    .filter((classDoc) => !classDoc.id.endsWith(IGNORED_CLASS))
    .map((classDoc) => ({
      className: classDoc.displayName,
      module: extractModule(classDoc.id),
      summary: classDoc.docs.summary,
      remarks: classDoc.docs.remarks,
      example: classDoc.initializer.usage,
      parameters: classDoc.initializer.parameters,
      languageName: 'java',
      languageDisplayName: 'Java',
    }))
    .filter((matcherDoc) => matcherDoc.module !== 'base')
    .reduce(
      (acc, curr) => ({ ...acc, [curr.className]: curr }),
      {} as Record<string, SingleLanguageMatcher>,
    );

const tsMatchers: Record<string, SingleLanguageMatcher> =
  ts.apiReference.classes
    .filter((classDoc) => classDoc.id.includes('matcher'))
    .filter((classDoc) => !classDoc.id.endsWith(IGNORED_CLASS))
    .map((classDoc) => ({
      className: classDoc.displayName,
      module: extractModule(classDoc.id),
      summary: classDoc.docs.summary,
      remarks: classDoc.docs.remarks,
      example: classDoc.initializer.usage,
      parameters: classDoc.initializer.parameters,
      languageName: 'typescript',
      languageDisplayName: 'Typescript',
    }))
    .filter((matcherDoc) => matcherDoc.module !== 'base')
    .reduce(
      (acc, curr) => ({ ...acc, [curr.className]: curr }),
      {} as Record<string, SingleLanguageMatcher>,
    );

export const matchers: Array<MatcherDoc> = Object.keys(tsMatchers).map(
  (key) => {
    const tsDetails = tsMatchers[key];
    if (!tsDetails) {
      throw new Error(`ERROR: ${key} has no tsDetails`);
    }
    const javaDetails = javaMatchers[key];
    if (!javaDetails) {
      throw new Error(`ERROR: ${key} has no javaDetails`);
    }
    return {
      ...tsDetails,
      languages: [tsDetails, javaDetails],
    };
  },
);
