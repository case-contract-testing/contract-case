import path from 'path';
import { GeneratedFile } from '../types';
import { buildJavaDescriptor } from './javaDescriptorBuilder';
import { renderJavaClass } from './javaRenderer';
import { InternalObjectDeclaration } from '../../typeSystem/internals';
import { LanguageGenerator } from '../../types';

/**
 * Generates complete Java DSL class code for a ContractCase matcher definition.
 *
 * The generated class will always have:
 * - At least one constructor (required parameters only)
 * - A second constructor (all parameters) if optional parameters exist
 * - All fields marked as final with Jackson annotations
 * - Generic type parameter <M> for matcher/data flexibility
 *
 * @returns GeneratedFile object containing the Java class source code and relative path
 *
 * @param definition - Complete matcher declaration containing name, type, documentation, and parameters.
 * @param category - the group for this matcher (eg `"arrays"`, etc). Doesn't have to be globally unique
 * @param namespace - Namespace prefix for the matcher type identifier. In core
 * plugins this will be `_case`, in other plugins this should be something
 * unique to your organisation or plugin. Must not be empty.
 *
 */
const generateJavaDslCode = async (
  definition: InternalObjectDeclaration,
  category: string,
  namespace: string,
): Promise<GeneratedFile[]> => {
  const descriptor = buildJavaDescriptor(definition, category, namespace);
  return [
    {
      content: await renderJavaClass(descriptor),
      entityNames: [descriptor.className],
      relativePath: path.join(
        descriptor.basePath,
        `${descriptor.className}.java`,
      ),
    },
  ];
};

export const javaGenerator: LanguageGenerator = {
  generateDslCode: generateJavaDslCode,
  generateExample(): Promise<string> {
    throw new Error('Function not implemented.');
  },
};
