import { PluginDslDeclaration } from '@contract-case/case-plugin-base';
import { generateJavaDslCode } from './java/javaGenerator';
import { GeneratedFileWriter } from './types';

type DslGenerator = {
  process: (plugin: PluginDslDeclaration | undefined) => Promise<void>;
};

export const makeGenerator = (
  fileWriter: GeneratedFileWriter,
): DslGenerator => ({
  process: (incomingPlugin: PluginDslDeclaration | undefined): Promise<void> =>
    Promise.resolve(incomingPlugin).then((plugin) => {
      if (plugin == null) {
        throw new Error("Plugin doesn't have a DSL description");
      }
      return Promise.all([
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
        ...(plugin.interactions
          ? plugin.interactions.map((interaction) =>
              generateJavaDslCode(
                { ...interaction, kind: 'interaction' },
                plugin.category,
                plugin.namespace,
              ).then((file) => fileWriter.write(file)),
            )
          : []),
      ]).then(() => {});
    }),
});
