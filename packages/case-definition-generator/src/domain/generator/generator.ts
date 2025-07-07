import { PluginDslDeclaration } from '../../entities/arrays';
import { generateJavaDslCode } from './java/javaGenerator';
import { GeneratedFileWriter } from './types';

type DslGenerator = {
  process: (plugin: PluginDslDeclaration) => void;
};

export const makeGenerator = (
  fileWriter: GeneratedFileWriter,
): DslGenerator => ({
  process: (plugin: PluginDslDeclaration): void => {
    plugin.matchers.forEach((matcher) => {
      fileWriter.write(generateJavaDslCode(matcher, plugin.namespace));
    });
  },
});
