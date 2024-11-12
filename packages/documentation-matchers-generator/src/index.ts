import { makeWriter } from './connectors/fileWriter.js';
import { matchers } from './connectors/matchers.js';
import { printMatchers } from './domain/matchers.js';

printMatchers(matchers, makeWriter);
