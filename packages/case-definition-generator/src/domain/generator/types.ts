export type GeneratedFile = {
  relativePath: string;
  content: string;
};

export type GeneratedFileWriter = {
  write(generatedFile: GeneratedFile): void;
};
