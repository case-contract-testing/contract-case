import { GeneratedFile } from './generator/types';
import { InternalObjectDeclaration } from './typeSystem/internals';

export type GeneratorLogger = {
  info: (message: string, ...additional: unknown[]) => void;
};

export type LanguageGenerator = {
  generateDslCode: (
    definition: InternalObjectDeclaration,
    category: string,
    namespace: string,
  ) => Promise<GeneratedFile>;
};
