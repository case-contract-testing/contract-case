import { LanguageGenerator } from '../../types';
import { InternalObjectDeclaration } from '../../typeSystem/internals';
import { GeneratedFile } from '../types';
import { generateMatcherDocumenation } from './matchers';

export const mdGenerator: LanguageGenerator = {
  generateDslCode: (
    definition: InternalObjectDeclaration,
    // category: string,
    // namespace: string,
  ): Promise<GeneratedFile[]> =>
    Promise.resolve().then((): GeneratedFile[] => {
      if (definition.kind === 'matcher') {
        return [generateMatcherDocumenation(definition)];
      }
      return [];
    }),
  generateExample: (): Promise<string> => {
    throw new Error('Function not implemented.');
  },
};
