import { LanguageTypes, MatcherDslDeclaration } from '../../typeSystem/types';
import { GeneratedFile } from '../types';
import { buildJavaDescriptor } from './javaDescriptorBuilder';
import { renderJavaClass } from './javaRenderer';

const javaLanguageTypes: LanguageTypes = {
  array: (type) => `List<${type}>`,
  data: 'Object',
  matcher: 'M',
};

/**
 * Generates complete Java DSL class code for a ContractCase matcher definition.
 *
 * This function now uses the new architecture that separates decision-making
 * (buildJavaDescriptor) from rendering (renderJavaClass), providing better
 * separation of concerns and testability.
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
 * @param namespace - Namespace prefix for the matcher type identifier. In core
 * plugins this will be `_case`, in other plugins this should be something
 * unique to your organisation or plugin. Must not be empty.
 *
 */
export function generateJavaDslCode(
  definition: MatcherDslDeclaration,
  namespace: string,
): GeneratedFile {
  // Build the descriptor containing all decisions about what to generate
  const descriptor = buildJavaDescriptor(definition, namespace);

  // Render the Java class based on the descriptor
  const content = renderJavaClass(descriptor);

  return {
    content,
    relativePath: `${definition.name}.java`,
  };
}
