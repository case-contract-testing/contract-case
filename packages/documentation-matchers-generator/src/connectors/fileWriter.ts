import { mkdirpSync } from 'mkdirp';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Writer } from '../domain/types.js';

export const makeWriter = (filename: string): Writer => {
  mkdirpSync(path.dirname(filename));
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
  const output = fs.createWriteStream(filename, {
    flush: true,
    start: 0,
  });
  return {
    writeLine: (line?: string) => output.write(`${line ?? ''}\n`),
    close: () => output.end(),
  };
};
