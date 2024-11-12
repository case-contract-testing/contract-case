import java from '@contract-case/case-definition-dsl/docs-json/java.json' assert { type: 'json' };
import * as fs from 'node:fs';

type TypeDisplayFormat =
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

/**
 * Formats a type from jsii's documentation output format
 */
const formatDisplayType = (pattern: TypeDisplayFormat): string => {
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
function formatParameterDescription(
  docs: { summary?: string; remarks?: string },
  name: string,
  displayName: string,
) {
  if (!('summary' in docs)) {
    console.log(
      `WARN (${name}): Parameter '${displayName}' has no documentation`,
    );
    return '';
  }
  const definitelyDocs = docs as { summary: string; remarks: string };
  const summary = definitelyDocs.summary
    .replace(/^- /, '')
    .replaceAll('\n', '<br/>');
  const remarks = definitelyDocs.remarks
    ? `<br/>${definitelyDocs.remarks.replaceAll('\n', '<br/>')}`
    : '';

  return `${summary}${remarks}`;
}

java.apiReference.classes
  .filter((classDoc) => classDoc.id.includes('matcher'))
  .forEach((classDoc) => {
    const name = classDoc.displayName;
    const { summary } = classDoc.docs;
    const { remarks } = classDoc.docs;
    const example = classDoc.initializer.usage;
    const { parameters } = classDoc.initializer;

    const path = `./output/${name}.mdx`;

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    const output = fs.createWriteStream(path, {
      flush: true,
      start: 0,
    });
    const writeLine = (line?: string) =>
      output.write(`${(line ?? '').replace(/[{}]/g, '')}\n`);

    writeLine("import Tabs from '@theme/Tabs';");
    writeLine("import TabItem from '@theme/TabItem';");
    writeLine();
    writeLine(summary);
    if (remarks) {
      writeLine();
      writeLine(`${remarks}`);
    }
    writeLine();
    writeLine('<Tabs groupId="language">');
    writeLine('  <TabItem value="java" label="Java">');
    writeLine('```java');
    writeLine(example);
    writeLine('```');

    if (parameters.length > 0) {
      writeLine();
      writeLine('#### Parameters <a name="Parameters" id="Parameters"></a>');
      writeLine('| **Name** | **Type** | **Description** |');
      writeLine('| --- | --- | --- |');

      parameters.forEach(({ displayName, type, docs }) => {
        writeLine(
          `| ${displayName} | \`${formatDisplayType(type)}\` | ${formatParameterDescription(docs, name, displayName)} |`,
        );
      });
    }

    writeLine('  </TabItem>');
    writeLine('</Tabs>');

    output.end();
  });
