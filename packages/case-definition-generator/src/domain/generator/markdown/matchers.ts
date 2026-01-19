import { InternalMatcherDslDeclaration } from '../../typeSystem/internals.js';
import { javaGenerator } from '../java/javaGenerator.js';
import { tsGenerator } from '../ts/tsGenerator.js';
import { GeneratedFile } from '../types.js';
import { formatParameterDescription } from './formatters/formatters.js';
import { LanguageDetails, ContentWriter } from './types.js';

const makeContent = (): ContentWriter => {
  const internalContent: string[] = [];

  return {
    writeLine: (line: string | undefined) =>
      internalContent.push(`${line ?? ''}\n`),
    toContent: () => internalContent.join(''),
  };
};

const renderLanguage = async (
  writer: ContentWriter,
  definition: InternalMatcherDslDeclaration,
  { languageMarkdownName, languageDisplayName, generator }: LanguageDetails,
) => {
  writer.writeLine(
    `  <TabItem value="${languageMarkdownName}" label="${languageDisplayName}">`,
  );
  writer.writeLine(`\`\`\`${languageMarkdownName}`);
  writer.writeLine(await generator.generateExample(definition));
  writer.writeLine('```');

  if (definition.params.length > 0) {
    writer.writeLine();
    writer.writeLine(
      '#### Parameters <a name="Parameters" id="Parameters"></a>',
    );
    writer.writeLine('| **Name** | **Type** | **Description** |');
    writer.writeLine('| --- | --- | --- |');

    definition.params.forEach(({ name, type, documentation }) => {
      writer.writeLine(
        `| ${name} | \`${type}\` | ${formatParameterDescription(documentation, definition.name, name)} |`,
      );
    });
  }

  writer.writeLine('  </TabItem>');
};

export const generateMatcherDocumenation = (
  definition: InternalMatcherDslDeclaration,
  // category: string,
  // namespace: string,
): GeneratedFile => {
  const filename = `./output/${module}/${definition.name}.mdx`;

  const content = makeContent();

  content.writeLine("import Tabs from '@theme/Tabs';");
  content.writeLine("import TabItem from '@theme/TabItem';");
  content.writeLine();
  content.writeLine(definition.documentation);

  content.writeLine();
  content.writeLine('<Tabs groupId="language">');
  [
    {
      languageMarkdownName: 'typescript',
      languageDisplayName: 'Typescript',
      generator: tsGenerator,
    },
    {
      languageMarkdownName: 'java',
      languageDisplayName: 'Java',
      generator: javaGenerator,
    },
  ].forEach((language) => renderLanguage(content, definition, language));
  content.writeLine('</Tabs>');

  return {
    entityNames: [definition.name],
    relativePath: filename,
    content: content.toContent(),
  };
};
