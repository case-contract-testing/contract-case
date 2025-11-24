import { PluginDslDeclaration } from '../typeSystem/types';
import { generateJavaDslCode } from './java/javaGenerator';
import { GeneratedFileWriter } from './types';

type DslGenerator = {
  process: (plugin: PluginDslDeclaration) => Promise<void>;
};

export const makeGenerator = (
  fileWriter: GeneratedFileWriter,
): DslGenerator => ({
  process: (plugin: PluginDslDeclaration): Promise<void> =>
    Promise.all([
      ...plugin.matchers.map((matcher) =>
        generateJavaDslCode(
          { ...matcher, kind: 'matcher' },
          plugin.category,
          plugin.namespace,
        ).then((file) => fileWriter.write(file)),
      ),
      ...(plugin.states
        ? plugin.states.map((state) =>
            generateJavaDslCode(
              { ...state, kind: 'state' },
              plugin.category,
              plugin.namespace,
            ).then((file) => fileWriter.write(file)),
          )
        : []),
    ]).then(() => {}),
});
