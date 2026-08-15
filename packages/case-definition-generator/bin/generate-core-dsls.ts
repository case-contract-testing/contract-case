#!/usr/bin/env node
/*!
 * Generates the core DSLs into their in-repo locations. This is a
 * maintainer script - it assumes it is running from within the ContractCase
 * monorepo, and writes:
 *
 * - The Java DSL classes into packages/dsl-java
 * - The TypeScript DSL classes into this package's src/generated/ts
 *
 * Run it with `npm run generate:core-dsls` (after a build).
 *
 * Third-party plugin authors should use the ContractCase CLI's
 * `generate-plugin-dsl` command instead.
 */
import { join } from 'node:path';

import httpPlugin from '@contract-case/case-core-plugin-http';
import functionPlugin from '@contract-case/case-core-plugin-function';
import {
  ContractCaseDslPlugin,
  PluginDslDeclaration,
} from '@contract-case/case-plugin-base';

import { makeFileWriter } from '../src/connectors/generatedFileWriter';
import { logger } from '../src/connectors/logger';
import { generateDsl } from '../src/domain/generateDsl';
import arrays from '../src/entities/arrays';
import convenience from '../src/entities/convenience';
import modifiers from '../src/entities/modifiers';
import objects from '../src/entities/objects';
import primitives from '../src/entities/primitives';
import strings from '../src/entities/strings';
import core from '../src/entities/core';

const withDescription = (
  humanReadableName: string,
  dsl: PluginDslDeclaration,
): ContractCaseDslPlugin => ({
  dsl,
  description: {
    humanReadableName,
    shortName: humanReadableName.toLowerCase(),
    uniqueMachineName: humanReadableName.toLowerCase(),
    version: '1.0.0',
  },
});

const corePlugins: ContractCaseDslPlugin[] = [
  withDescription('Arrays', arrays),
  functionPlugin,
  withDescription('Convenience', convenience),
  withDescription('Modifiers', modifiers),
  withDescription('Objects', objects),
  withDescription('Primitives', primitives),
  withDescription('Strings', strings),
  withDescription('Core', core),
  httpPlugin,
];

// Compiled location is dist/bin, so the packages directory of the monorepo
// is three levels up
const packagesDir = join(__dirname, '..', '..', '..');

const javaWriter = makeFileWriter(join(packagesDir, 'dsl-java'), logger);
const tsWriter = makeFileWriter(
  join(packagesDir, 'case-definition-generator', 'src', 'generated', 'ts'),
  logger,
);

generateDsl(corePlugins, ['java'], javaWriter)
  .then(() => generateDsl(corePlugins, ['ts'], tsWriter))
  .then(
    () => {
      logger.info('Core DSL generation complete');
    },
    (e) => {
      // eslint-disable-next-line no-console
      console.error(`Core DSL generation failed: ${e.message}`);
      process.exitCode = 1;
    },
  );
