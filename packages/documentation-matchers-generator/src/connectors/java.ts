import java from '@contract-case/case-definition-dsl/docs-json/java.json' assert { type: 'json' };
import { MatcherDoc } from '../domain/types.js';

const IGNORED_CLASS = 'IgnoreThisClass';

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

export const javaMatchers: Array<MatcherDoc> = java.apiReference.classes
  .filter((classDoc) => classDoc.id.includes('matcher'))
  .filter((classDoc) => !classDoc.id.endsWith(IGNORED_CLASS))
  .map((classDoc) => ({
    name: classDoc.displayName,
    module: extractModule(classDoc.id),
    summary: classDoc.docs.summary,
    remarks: classDoc.docs.remarks,
    example: classDoc.initializer.usage,
    parameters: classDoc.initializer.parameters,
  }))
  .filter((matcherDoc) => matcherDoc.module !== 'base');
