import { mkdirp } from 'mkdirp';

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import {
  GeneratedFile,
  GeneratedFileWriter,
} from '../../domain/generator/types';
import { GeneratorLogger } from '../../domain/types';

const createDirectory = (pathToFile: string) => {
  const dirName = path.dirname(pathToFile);
  if (!fs.existsSync(dirName)) {
    try {
      mkdirp.sync(dirName);
    } catch (e) {
      throw new CaseConfigurationError(
        `Failed trying to create contract directory '${dirName}': ${
          (e as Error).message
        }`,
        'DONT_ADD_LOCATION',
        'DISK_IO_PROBLEM',
      );
    }
  }
};

export const makeFileWriter = (
  basePath: string,
  logger: GeneratorLogger,
): GeneratedFileWriter => ({
  write: (generatedFile: GeneratedFile): void => {
    const fullPath = path.join(basePath, generatedFile.relativePath);
    // TODO: Extract this nicely
    logger.info(
      `[${chalk.blueBright(generatedFile.entityNames.join(','))}] written in ${fullPath}`,
    );

    createDirectory(fullPath);
    fs.writeFileSync(fullPath, generatedFile.content);
  },
});
