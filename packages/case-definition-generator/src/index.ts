import { makeFileWriter } from './connectors/generatedFileWriter';
import { makeGenerator } from './domain/generator/generator';
import arrays from './entities/arrays';

const writer = makeFileWriter();

const generator = makeGenerator(writer);

generator.process(arrays);
