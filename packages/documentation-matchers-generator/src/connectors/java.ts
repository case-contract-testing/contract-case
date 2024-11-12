import java from '@contract-case/case-definition-dsl/docs-json/java.json' assert { type: 'json' };
import { MatcherDoc } from '../domain/types.js';

const IGNORED_CLASS = 'IgnoreThisClass';

export const javaMatchers: Array<MatcherDoc> = java.apiReference.classes
  .filter((classDoc) => classDoc.id.includes('matcher'))
  .filter((classDoc) => !classDoc.id.endsWith(IGNORED_CLASS))
  .map((classDoc) => ({
    name: classDoc.displayName,
    summary: classDoc.docs.summary,
    remarks: classDoc.docs.remarks,
    example: classDoc.initializer.usage,
    parameters: classDoc.initializer.parameters,
  }));
