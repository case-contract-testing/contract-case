import {
  CaseConfigurationError,
  ContractCaseDslPlugin,
} from '@contract-case/case-plugin-base';
import { GeneratedFileWriter } from './types';
import { LanguageGenerator } from '../types';

type DslGenerator = {
  process: (plugin: ContractCaseDslPlugin) => Promise<void>;
};

export const makeGenerator = (
  fileWriter: GeneratedFileWriter,
  dslGenerator: LanguageGenerator,
): DslGenerator => ({
  process: (incomingPlugin: ContractCaseDslPlugin): Promise<void> =>
    Promise.resolve(incomingPlugin).then(({ dsl, description }) => {
      if (dsl == null) {
        throw new CaseConfigurationError(
          `Plugin '${description.humanReadableName}' doesn't have a 'dsl' property, so no matchers, states or interactions are declared`,
          'DONT_ADD_LOCATION',
          'BAD_DSL_DECLARATION',
        );
      }
      return Promise.all([
        ...dsl.matchers.map((matcher) =>
          dslGenerator
            .generateDslCode(
              { ...matcher, kind: 'matcher' },
              dsl.category,
              dsl.namespace,
            )
            .then((files) => files.map((file) => fileWriter.write(file))),
        ),
        ...(dsl.states
          ? dsl.states.map((state) =>
              dslGenerator
                .generateDslCode(
                  { ...state, kind: 'state' },
                  dsl.category,
                  dsl.namespace,
                )
                .then((files) => files.map((file) => fileWriter.write(file))),
            )
          : []),
        ...(dsl.interactions
          ? dsl.interactions.map((interaction) =>
              dslGenerator
                .generateDslCode(
                  { ...interaction, kind: 'interaction' },
                  dsl.category,
                  dsl.namespace,
                )
                .then((files) => files.map((file) => fileWriter.write(file))),
            )
          : []),
      ]).then(() => {});
    }),
});
