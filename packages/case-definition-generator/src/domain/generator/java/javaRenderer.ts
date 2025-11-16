import {
  Class,
  Field,
  Parameter,
  Type,
  Access,
  Annotation,
  ClassReference,
  Writer,
  CodeBlock,
} from '@amplication/java-ast';
import {
  CaseConfigurationError,
  CaseCoreError,
} from '@contract-case/case-plugin-base';
import prettier from 'prettier';
import {
  JavaDescriptor,
  JavaFieldDescriptor,
  JavaConstructorDescriptor,
} from './types';
import { isTypeContainer, ParameterType } from '../../typeSystem/types';

export const getJavaType = (
  parameterType: ParameterType,
  packageName: string,
): Type => {
  if (isTypeContainer(parameterType)) {
    return Type.list(getJavaType(parameterType.type, packageName));
  }
  switch (parameterType) {
    case 'AnyCaseMatcherOrData':
      return Type.reference(
        new ClassReference({
          name: 'M',
          packageName,
        }),
      );
    case 'AnyData':
      return Type.object();
    case 'String':
      return Type.string();
    case 'Integer':
      return Type.integer();
    default:
      throw new CaseConfigurationError(
        `Unknown parameter type for Java: ${parameterType}`,
        'DONT_ADD_LOCATION',
        'BAD_DSL_DECLARATION',
      );
  }
};

/**
 * Creates a Java field from a field descriptor
 *
 * @param fieldDescriptor - Field descriptor containing all field information
 * @returns Field AST node
 */
const createField = (
  fieldDescriptor: JavaFieldDescriptor,
  packageName: string,
): Field => {
  const annotations: Annotation[] = [];

  if (fieldDescriptor.optional) {
    annotations.push(
      new Annotation({
        reference: new ClassReference({
          name: 'Nullable',
          packageName: 'javax.annotation',
        }),
      }),
    );
    annotations.push(
      new Annotation({
        reference: new ClassReference({
          name: 'JsonInclude',
          packageName: 'com.fasterxml.jackson.annotation',
        }),
        argument: new CodeBlock({
          code: 'Include.NON_NULL',
          references: [
            new ClassReference({
              name: 'Include',
              packageName: 'com.fasterxml.jackson.annotation.JsonInclude',
            }),
          ],
        }),
      }),
    );
  }

  annotations.push(
    new Annotation({
      reference: new ClassReference({
        name: 'Getter',
        packageName: 'lombok',
      }),
    }),
    new Annotation({
      reference: new ClassReference({
        name: 'JsonProperty',
        packageName: 'com.fasterxml.jackson.annotation',
      }),
      argument: new CodeBlock({
        code: `"${fieldDescriptor.jsonPropertyName}"`,
      }),
    }),
  );

  return new Field({
    name: fieldDescriptor.name,
    type: getJavaType(fieldDescriptor.type, packageName),
    access: Access.Private,
    javadoc: fieldDescriptor.documentation,
    final_: true,
    annotations,
  });
};

/**
 * Creates a Java constructor from a constructor descriptor
 *
 * @param constructorDescriptor - Constructor descriptor containing all constructor information
 * @param className - Name of the class for the constructor
 * @returns Method AST node configured as a constructor
 */
const createConstructor = (
  constructorDescriptor: JavaConstructorDescriptor,
  packageName: string,
): Class.Constructor => {
  const bodyStatements: string[] = [];
  bodyStatements.push(`this.type = "${constructorDescriptor.typeValue}";`);
  constructorDescriptor.parameters.forEach((param) => {
    bodyStatements.push(`this.${param.name} = ${param.name};`);
  });
  constructorDescriptor.optionalParamsToSetNull.forEach((param) => {
    bodyStatements.push(`this.${param.name} = null;`);
  });

  return {
    access: Access.Public,
    annotations: [
      new Annotation({
        reference: new ClassReference({
          name: 'Builder',
          packageName: 'lombok',
        }),
      }),
    ],
    parameters: constructorDescriptor.parameters.map(
      (param) =>
        new Parameter({
          final_: true,
          name: param.name,
          annotations: param.optional
            ? [
                new Annotation({
                  reference: new ClassReference({
                    name: 'Nullable',
                    packageName: 'javax.annotation',
                  }),
                }),
              ]
            : [
                new Annotation({
                  reference: new ClassReference({
                    name: 'NotNull',
                    packageName: 'org.jetbrains.annotations',
                  }),
                }),
              ],
          docs: param.documentation,
          type: getJavaType(param.type, packageName),
        }),
    ),
    body: new CodeBlock({ code: bodyStatements.join('\n    ') }),
  };
};

/**
 * Renders a complete Java class based on a JavaDescriptor
 * This function contains only generation logic and makes no decisions
 * about what to generate - it simply renders what is described in the descriptor.
 *
 * @param descriptor - Complete description of the Java class to generate
 * @returns Complete Java class source code as a string
 */
export function renderJavaClass(descriptor: JavaDescriptor): Promise<string> {
  // Create the main class
  const javaClass = new Class({
    name: descriptor.className,
    packageName: descriptor.packageName,
    access: Access.Public,
    typeParameters: [descriptor.genericTypeParameter],
    javadoc: descriptor.classDocumentation || '',
  });

  // Add all fields
  descriptor.fields.forEach((fieldDescriptor) => {
    javaClass.addField(createField(fieldDescriptor, descriptor.packageName));
  });

  // Add constructors using addConstructor method
  descriptor.constructors.forEach((constructorDescriptor) => {
    const constructor = createConstructor(
      constructorDescriptor,
      descriptor.packageName,
    );

    javaClass.addConstructor(constructor);
  });

  // Generate the Java code
  const writer = new Writer({ packageName: descriptor.packageName });
  javaClass.write(writer);

  const code = writer.toString();

  return prettier
    .format(code, { parser: 'java', plugins: ['prettier-plugin-java'] })
    .then((formatted) => formatted)
    .catch((err) => {
      throw new CaseCoreError(
        `Error formatting Java code. This means that there's a bug in the Java code generator. Error was: ${err.message}\n\nBroken code was: ${code}`,
      );
    });
}
