import httpPlugin from '@contract-case/case-core-plugin-http';
import functionPlugin from '@contract-case/case-core-plugin-function';
import { makeFileWriter } from './connectors/generatedFileWriter';
import { logger } from './connectors/logger';
import { makeGenerator } from './domain/generator/generator';
import arrays from './entities/arrays';
import convenience from './entities/convenience';
import modifiers from './entities/modifiers';
import objects from './entities/objects';
import primitives from './entities/primitives';
import strings from './entities/strings';
import core from './entities/core';
import { javaGenerator } from './domain/generator/java/javaGenerator';
import { GeneratedFileWriter } from './domain/generator/types';
import { LanguageGenerator } from './domain/types';
import { tsGenerator } from './domain/generator/ts/tsGenerator';

// TODO: Hook this into the CLI so that we can
// invoke it anywhere
const generateCoreDsl = (
  writer: GeneratedFileWriter,
  language: LanguageGenerator,
) => {
  const generator = makeGenerator(writer, language);

  generator.process({
    dsl: arrays,
    description: {
      humanReadableName: 'Arrays',
      shortName: 'arrays',
      uniqueMachineName: 'arrays',
      version: '1.0.0',
    },
  });
  generator.process(functionPlugin);
  generator.process({
    dsl: convenience,
    description: {
      humanReadableName: 'Convenience',
      shortName: 'convenience',
      uniqueMachineName: 'convenience',
      version: '1.0.0',
    },
  });
  generator.process({
    dsl: modifiers,
    description: {
      humanReadableName: 'Modifiers',
      shortName: 'modifiers',
      uniqueMachineName: 'modifiers',
      version: '1.0.0',
    },
  });
  generator.process({
    dsl: objects,
    description: {
      humanReadableName: 'Objects',
      shortName: 'objects',
      uniqueMachineName: 'objects',
      version: '1.0.0',
    },
  });
  generator.process({
    dsl: primitives,
    description: {
      humanReadableName: 'Primitives',
      shortName: 'primitives',
      uniqueMachineName: 'primitives',
      version: '1.0.0',
    },
  });
  generator.process({
    dsl: strings,
    description: {
      humanReadableName: 'Strings',
      shortName: 'strings',
      uniqueMachineName: 'strings',
      version: '1.0.0',
    },
  });
  generator.process({
    dsl: core,
    description: {
      humanReadableName: 'Core',
      shortName: 'core',
      uniqueMachineName: 'core',
      version: '1.0.0',
    },
  });
  generator.process(httpPlugin);
};

// TODO: Correct this path
const javaWriter = makeFileWriter(
  '/Users/home/office/contract-case/contract-case/packages/dsl-java/',
  logger,
);
// TODO: Correct this path
const tsWriter = makeFileWriter(
  '/Users/home/office/contract-case/contract-case/packages/case-definition-generator/src/generated/ts',
  logger,
);

generateCoreDsl(javaWriter, javaGenerator);
generateCoreDsl(tsWriter, tsGenerator);
