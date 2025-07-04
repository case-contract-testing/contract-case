import { mkdirp } from 'mkdirp';

import * as fs from 'fs';
import * as path from 'path';
import { CaseConfigurationError } from '@contract-case/case-plugin-base';
import {
  GeneratedFile,
  GeneratedFileWriter,
} from '../../domain/generator/types';

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

export const makeFileWriter = (): GeneratedFileWriter => ({
  write: (generatedFile: GeneratedFile): void => {
    createDirectory(generatedFile.relativePath);
    fs.writeFileSync(generatedFile.relativePath, generatedFile.content);
  },
});
