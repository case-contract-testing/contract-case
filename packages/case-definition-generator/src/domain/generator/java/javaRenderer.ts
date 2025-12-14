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
import prettier from 'prettier';
import {
  CaseConfigurationError,
  CaseCoreError,
} from '@contract-case/case-plugin-base';
import {
  JavaDescriptor,
  JavaFieldDescriptor,
  JavaConstructorDescriptor,
} from './types';
import {
  isTypeContainer,
  ParameterType,
  isPassToMatcher,
  PassToMatcher,
  ParameterDeclaration,
  MatcherReference,
} from '../../typeSystem/types';
import { UnreachableError } from '../../../entities/errors/unreachableError';

/**
 * Validates that a parameter type is not a pass to matcher
 *
 * @param t - The parameter type to validate
 * @param context - The context in which the parameter type is used, used for error reporting
 */
const validateNotPassToMatcher = (
  t: ParameterType,
  context: string,
): Exclude<ParameterType, PassToMatcher> => {
  if (isPassToMatcher(t)) {
    throw new CaseConfigurationError(
      `Encountered a bad definition - a PassToMatcher is not valid as a parameter for ${context}`,
      'DONT_ADD_LOCATION',
      'BAD_DSL_DECLARATION',
    );
  }
  return t;
};

const toMatcherPackageName = (namespace: string, category?: string): string => {
  if (namespace === '_case') {
    const CORE = 'io.contract_testing.contractcase.dsl';
    return category ? `${CORE}.matchers.${category}` : CORE;
  }
  throw new CaseCoreError(
    `Non core namespaces are currently not supported ${namespace}`,
  );
};

const toClassReference = (matcherReference: MatcherReference) =>
  new ClassReference({
    name: matcherReference.name,
    packageName: toMatcherPackageName(
      matcherReference.namespace,
      matcherReference.category,
    ),
  });

/**
 * Converts a ParameterType to a java type, where there's no passthrough matchers allowed
 *
 * @param parameterType - The type to convert to a Java type
 * @param packageName - The current package name, used for class references
 * @returns
 */
export const getJavaType = (
  parameterType: Exclude<ParameterType, PassToMatcher>,
  packageName: string,
): Type => {
  if (isTypeContainer(parameterType)) {
    return Type.list(
      getJavaType(
        validateNotPassToMatcher(parameterType.type, 'a TypeContainer'),
        packageName,
      ),
    );
  }
  switch (parameterType) {
    case 'AnyCaseMatcherOrData':
      return Type.object();
    /* 
       Type.reference(
        new ClassReference({
          name: 'M',
          packageName,
        }),
      );
    */
    case 'AnyData':
      return Type.object();
    case 'string':
      return Type.string();
    case 'integer':
      return Type.integer();
    case 'number':
      return Type.double();
    case 'boolean':
      return Type.boolean();
    case 'null':
      return Type.object();
    case 'json':
      return Type.object();
    default:
      throw new UnreachableError(
        `Unknown parameter type for Java: ${parameterType}`,
        parameterType,
      );
  }
};

interface RecursiveRecord {
  [key: string]: string | RecursiveRecord;
}

/**
 * Converts a string or recursive record to a Java Map.ofEntries declaration
 *
 * @param initialValue - The string or recursive record to convert
 * @returns The Java code string
 */
function toJavaCode(initialValue: string | RecursiveRecord): string {
  if (typeof initialValue === 'string') {
    return JSON.stringify(initialValue);
  }
  return `Map.ofEntries(${Object.entries(initialValue)
    .map(
      ([key, value]) =>
        `Map.entry(${JSON.stringify(key)}, ${toJavaCode(value)})`,
    )
    .join(', ')})`;
}

/**
 * Creates an array of Java fields from a field descriptor
 *
 * @param fieldDescriptor - Field descriptor containing all field information
 * @returns Field AST node
 */
const createField = (
  fieldDescriptor: JavaFieldDescriptor,
  packageName: string,
): Field => {
  // Sometimes, there might be more than one field described by this field
  const javaType = isPassToMatcher(fieldDescriptor.type)
    ? Type.reference(toClassReference(fieldDescriptor.type.matcherReference))
    : getJavaType(fieldDescriptor.type, packageName);

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
    type: javaType,
    access: Access.Private,
    javadoc: fieldDescriptor.documentation,
    final_: true,
    annotations,
    ...(fieldDescriptor.initialValue
      ? {
          initializer: new CodeBlock({
            code: toJavaCode(fieldDescriptor.initialValue),
            references:
              typeof fieldDescriptor.initialValue !== 'string'
                ? [
                    new ClassReference({
                      name: 'Map',
                      packageName: 'java.util',
                    }),
                  ]
                : [],
          }),
        }
      : {}),
  });
};

/**
 * Creates a Java context field
 *
 * @param contextPrefix - The place in the context to add this variable when serialised
 * @param name - The name of the constant
 * @param value - The value of the constant
 * @returns Field AST node
 */
const createConstantField = (
  contextPrefix: string,
  name: string,
  value: string,
): Field =>
  new Field({
    name,
    type: Type.string(),
    access: Access.Public,
    final_: true,
    initializer: new CodeBlock({
      code: `"${value}"`,
    }),
    annotations: [
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
          code: `"${contextPrefix}:${name}"`,
        }),
      }),
      new Annotation({
        reference: new ClassReference({
          name: 'JsonInclude',
          packageName: 'com.fasterxml.jackson.annotation',
        }),
        argument: new CodeBlock({
          code: 'Include.ALWAYS',
          references: [
            new ClassReference({
              name: 'Include',
              packageName: 'com.fasterxml.jackson.annotation.JsonInclude',
            }),
          ],
        }),
      }),
    ],
  });

/**
 * Creates a Java parameter from a parameter descriptor
 *
 * @param param - Parameter descriptor containing parameter information
 * @param packageName - The current package name, used for class references
 * @returns Parameter AST node
 */
const createParameter = (
  param: ParameterDeclaration,
  packageName: string,
): Parameter => {
  if (isPassToMatcher(param.type)) {
    throw new CaseConfigurationError(
      'Encountered a bad definition - a PassToMatcher is not valid as a parameter for createParameter',
      'DONT_ADD_LOCATION',
      'BAD_DSL_DECLARATION',
    );
  }

  const javaType = getJavaType(param.type, packageName);

  return new Parameter({
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
    type: javaType,
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
  const references: ClassReference[] = [];
  bodyStatements.push(`this.type = "${constructorDescriptor.typeValue}";`);
  constructorDescriptor.parameters.forEach((param) => {
    if (!isPassToMatcher(param.type)) {
      bodyStatements.push(`this.${param.name} = ${param.name};`);
    } else {
      references.push(toClassReference(param.type.matcherReference));
      bodyStatements.push(
        `this.${param.name} = new ${param.type.matcherReference.name}(${param.type.exposedParams
          .map((exposedParam) => exposedParam.name)
          .join(', ')});`,
      );
    }
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
    parameters: constructorDescriptor.parameters.flatMap((param) => {
      if (isPassToMatcher(param.type)) {
        return param.type.exposedParams.map((exposedParam) =>
          createParameter(exposedParam, packageName),
        );
      }
      return [createParameter(param, packageName)];
    }),
    body: new CodeBlock({ code: bodyStatements.join('\n    ') }),
  };
};

const interfaceFor = (
  kind: 'matcher' | 'state' | 'interaction',
): ClassReference => {
  switch (kind) {
    case 'matcher':
      return new ClassReference({
        name: 'DslMatcher',
        packageName: toMatcherPackageName('_case'),
      });
    case 'state':
      return new ClassReference({
        name: 'DslState',
        packageName: toMatcherPackageName('_case'),
      });
    case 'interaction':
      return new ClassReference({
        name: 'DslInteraction',
        packageName: toMatcherPackageName('_case'),
      });
    default:
      throw new UnreachableError(
        `Unknown kind for interface in java: ${kind}`,
        kind,
      );
  }
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
    //   typeParameters: [descriptor.genericTypeParameter],
    javadoc: descriptor.classDocumentation || '',
    implements_: [interfaceFor(descriptor.kind)],
    annotations: [
      new Annotation({
        reference: new ClassReference({
          name: 'Generated',
          packageName: 'jakarta.annotation',
        }),
        argument: new CodeBlock({
          code: `"@contract-case/case-definition-generator"`,
        }),
      }),
      new Annotation({
        reference: new ClassReference({
          name: 'ContractCaseDsl',
          packageName: toMatcherPackageName('_case'),
        }),
      }),
    ],
  });

  // Add all fields
  descriptor.fields.forEach((fieldDescriptor) => {
    javaClass.addField(createField(fieldDescriptor, descriptor.packageName));
  });

  Object.entries(descriptor.contextModifiers).forEach(([name, value]) => {
    javaClass.addField(createConstantField('_case:context', name, value));
  });

  Object.entries(descriptor.currentRunModifiers).forEach(([name, value]) => {
    javaClass.addField(
      // Note that context fields always have the internal `_case` prefix
      // as that's the intended audience
      createConstantField('_case:currentRun:context', name, value),
    );
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
