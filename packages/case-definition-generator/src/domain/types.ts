import { GeneratedFile } from './generator/types';
import { InternalObjectDeclaration } from './typeSystem/internals';

export type GeneratorLogger = {
  info: (message: string, ...additional: unknown[]) => void;
};

export type LanguageGenerator = {
  /**
   * Generates files for this DSL object
   */
  generateDslCode: (
    definition: InternalObjectDeclaration,
    category: string,
    namespace: string,
  ) => Promise<GeneratedFile[]>;

  /**
   * Generates an example for this DSL object
   */
  generateExample: (definition: InternalObjectDeclaration) => Promise<string>;
};
