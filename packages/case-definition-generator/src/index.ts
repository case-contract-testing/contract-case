import { makeFileWriter } from './connectors/generatedFileWriter';
import { logger } from './connectors/logger';
import { makeGenerator } from './domain/generator/generator';
import arrays from './entities/arrays';
import convenience from './entities/convenience';
import functions from './entities/functions';
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

const generator = makeGenerator(writer);

generator.process(arrays);
generator.process(functions);
generator.process(convenience);
generator.process(modifiers);
generator.process(objects);
generator.process(primitives);
generator.process(strings);
generator.process(core);
