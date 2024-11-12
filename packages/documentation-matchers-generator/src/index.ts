import { makeWriter } from './connectors/fileWriter.js';
import { javaMatchers } from './connectors/java.js';
import { printMatchers } from './domain/matchers.js';

printMatchers(javaMatchers, makeWriter);
