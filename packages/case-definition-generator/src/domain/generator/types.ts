export type GeneratedFile = {
  /** The names of the entity / entities written in this file, for logging etc */
  entityNames: string[];
  /** The relative path to the source root for this file */
  relativePath: string;
  /** The file content to be written */
  content: string;
};

export type GeneratedFileWriter = {
  write(generatedFile: GeneratedFile): void;
};
