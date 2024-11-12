import {
  formatDisplayType,
  formatParameterDescription,
  replaceTsDocLinks,
} from './formatters/formatters.js';
import { LanguageDetails, MatcherDoc, Writer } from './types.js';

const renderLanguage = (
  writer: Writer,
  {
    example,
    parameters,
    className,
    languageName,
    languageDisplayName,
  }: LanguageDetails,
) => {
  writer.writeLine(
    `  <TabItem value="${languageName}" label="${languageDisplayName}">`,
  );
  writer.writeLine(`\`\`\`${languageName}`);
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
        `| ${displayName} | \`${formatDisplayType(type)}\` | ${formatParameterDescription(docs, className, displayName)} |`,
      );
    });
  }

  writer.writeLine('  </TabItem>');
};

export const printMatchers = (
  matchers: Array<MatcherDoc>,
  makeWriter: (filename: string) => Writer,
): void => {
  matchers.forEach(
    ({ summary, remarks, example, parameters, name, module }) => {
      const filename = `./output/${module}/${name}.mdx`;

      const writer = makeWriter(filename);

      writer.writeLine("import Tabs from '@theme/Tabs';");
      writer.writeLine("import TabItem from '@theme/TabItem';");
      writer.writeLine();
      writer.writeLine(replaceTsDocLinks(summary));
      if (remarks) {
        writer.writeLine();
        writer.writeLine(`${replaceTsDocLinks(remarks)}`);
      }
      writer.writeLine();
      writer.writeLine('<Tabs groupId="language">');
      renderLanguage(writer, {
        languageName: 'java',
        languageDisplayName: 'Java',
        example,
        parameters,
        className: name,
      });
      writer.writeLine('</Tabs>');
      writer.close();
    },
  );
};
