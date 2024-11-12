import {
  formatDisplayType,
  formatParameterDescription,
} from './formatters/formatters.js';
import { MatcherDoc, Writer } from './types.js';

export const printMatchers = (
  matchers: Array<MatcherDoc>,
  makeWriter: (filename: string) => Writer,
): void => {
  matchers.forEach(({ summary, remarks, example, parameters, name }) => {
    const filename = `./output/${name}.mdx`;

    const writer = makeWriter(filename);

    writer.writeLine("import Tabs from '@theme/Tabs';");
    writer.writeLine("import TabItem from '@theme/TabItem';");
    writer.writeLine();
    writer.writeLine(summary);
    if (remarks) {
      writer.writeLine();
      writer.writeLine(`${remarks}`);
    }
    writer.writeLine();
    writer.writeLine('<Tabs groupId="language">');
    writer.writeLine('  <TabItem value="java" label="Java">');
    writer.writeLine('```java');
    writer.writeLine(example);
    writer.writeLine('```');

    if (parameters.length > 0) {
      writer.writeLine();
      writer.writeLine(
        '#### Parameters <a name="Parameters" id="Parameters"></a>',
      );
      writer.writeLine('| **Name** | **Type** | **Description** |');
      writer.writeLine('| --- | --- | --- |');

      parameters.forEach(({ displayName, type, docs }) => {
        writer.writeLine(
          `| ${displayName} | \`${formatDisplayType(type)}\` | ${formatParameterDescription(docs, name, displayName)} |`,
        );
      });
    }

    writer.writeLine('  </TabItem>');
    writer.writeLine('</Tabs>');
    writer.close();
  });
};
