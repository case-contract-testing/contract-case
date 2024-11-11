import java from '@contract-case/case-definition-dsl/docs-json/java.json' assert { type: 'json' };
import * as fs from 'node:fs';

type Format =
  | {
      formattingPattern: string;
      types?: Format[];
    }
  | {
      id: string;
      displayName: string;
      fqn: string;
      packageName: string;
      packageVersion: string;
      submodule: string;
    };
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

    writeLine();
    writeLine('#### Parameters <a name="Parameters" id="Parameters"></a>');
    writeLine('| **Name** | **Type** | **Description** |');
    writeLine('| --- | --- | --- |');
    const formatPattern = (pattern: Format): string => {
      if ('id' in pattern) {
        // TODO: Make this a link
        return `${pattern.submodule}.${pattern.displayName}`;
      }

      const replacements = (pattern.types ?? []).map(formatPattern);
      return replacements.reduce(
        (acc, curr) => acc.replace('%', curr),
        pattern.formattingPattern,
      );
    };

    parameters.forEach(({ displayName, type, docs }) => {
      let line;
      if (!('summary' in docs)) {
        console.log(
          `WARN (${name}): Parameter '${displayName}' has no documentation`,
        );
        line = '';
      } else {
        const definitelyDocs = docs as { summary: string; remarks: string };
        line = `${definitelyDocs.summary.replace(/^- /, '').replaceAll('\n', '<br/>')}${definitelyDocs.remarks ? `<br/>${definitelyDocs.remarks.replaceAll('\n', '<br/>')}` : ''}`;
      }
      writeLine(`| ${displayName} | \`${formatPattern(type)}\` | ${line} |`);
    });

    //    | <code><a href="#@contract-case/case-definition-dsl.matchers.ArrayLengthOptions.property.minLength">minLength</a></code> | <code>java.lang.Number</code> | The minimum length for the array - must be greater than zero, otherwise empty arrays pass and you wouldn't be testing the array contents | . |

    writeLine('  </TabItem>');
    writeLine('</Tabs>');

    output.end();
  });
