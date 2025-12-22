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

// TODO: Correct this path
const writer = makeFileWriter(
  '/Users/home/office/contract-case/contract-case/packages/dsl-java/',
  logger,
);

// TODO: Hook this into the CLI so that we can
// invoke it anywhere
const generator = makeGenerator(writer);

generator.process(arrays);
generator.process(functionPlugin.dsl);
generator.process(convenience);
generator.process(modifiers);
generator.process(objects);
generator.process(primitives);
generator.process(strings);
generator.process(core);
generator.process(httpPlugin.dsl);
