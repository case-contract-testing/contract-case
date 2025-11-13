import { makeFileWriter } from './connectors/generatedFileWriter';
import { logger } from './connectors/logger';
import { makeGenerator } from './domain/generator/generator';
import arrays from './entities/arrays';

// TODO: Correct this path
const writer = makeFileWriter(
  '/Users/home/office/contract-case/contract-case/packages/dsl-java/',
  logger,
);

const generator = makeGenerator(writer);

generator.process(arrays);
