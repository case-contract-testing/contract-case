export * from './typeSystem.types';

export type PluginDslDeclaration = {
  /**
   * The author's namespace for this matcher.
   * This is the prefix that the type
   * constants in this package will have.
   */
  namespace: string;
  /** The category within the namespace,
   * used for grouping related matchers
   * together (eg arrays) */
  category: string;
  matchers: MatcherDslDeclaration[];
  dataObjects: DataObjectDeclaration[];
};

/**
 * ParameterType tells us what type a parameter is.
 */
export type ParameterType =
  | TypeContainer
  | 'AnyCaseMatcherOrData'
  | 'AnyData'
  | 'Integer'
  | 'String';

export type TypeContainer = {
  /** What kind of container this is */
  kind: 'array';
  /** The type of the elements contained within this container */
  type: ParameterType;
};

/**
 * Type guard function that determines whether a ParameterType is a TypeContainer
 * or a plain string type.
 *
 * @param parameterType - The parameter type to check
 * @returns true if the parameter is a TypeContainer, false if it's a string
 */
export const isTypeContainer = (
  parameterType: ParameterType,
): parameterType is TypeContainer =>
  typeof parameterType === 'object' &&
  parameterType.kind &&
  typeof parameterType.kind === 'string';

/**
 * Declares a parameter for a matcher
 */
export type ParameterDeclaration = {
  /** The name of the parameter, used for documentation, actual method declaration, and any builders */
  name: string;
  /**
   * Documentation for the parameter.
   *
   * Yes, this is required. We're sorry about that,
   * but hopefully the users of your plugin won't be.
   */
  documentation: string;
  /** Type of this parameter */
  type: ParameterType;
  /**
   * If set, whether or not this parameter is optional. Optional parameters must
   * be the last ones in order. Defaults to required if not set
   */
  optional?: boolean;
  /** If set, will override the generated json property name for this parameter */
  jsonPropertyName?: string;
};

/** Defines the DSL for a matcher. Note that more than one Matcher DSL can point to the same matcher implementation */
export type MatcherDslDeclaration = {
  /*
   * The name of the DSL matcher, in CamelCase with no spaces.
   *
   * This is used to generate the type names, etc. Must
   * be unique within your plugin,  across all declarations.
   */
  name: string;
  /**
   * The type constant for your matcher, without the namespace.
   * Along with the namespace, this is what ContractCase uses to
   * determine which implementation to use at match time.
   *
   * Although these must be globally unique for matcher implementations,
   * more than one MatcherDslDeclaration can share the same type constant.
   * This is useful if you want to have different defaults or different
   * names in the DSL for the same matcher.
   */
  type: string;
  /**
   * Documentation for this matcher. Yes, this is required. We're not sorry about that,
   * and hopefully the users of your plugin won't be sorry about it either.
   */
  documentation: string;
  /** An ordered array of parameter declarations. If any parameters are optional, they must be at the end. */
  params: ParameterDeclaration[];
};

/** Defines the DSL for a matcher. Note that more than one Matcher DSL can point to the same matcher implementation */
export type DataObjectDeclaration = {
  /*
   * The name of the DSL matcher, in CamelCase with no spaces.
   *
   * This is used to generate the type names, etc. Must
   * be unique within your plugin, across all declarations.
   */
  name: string;
  /**
   * Documentation for this matcher. Yes, this is required. We're not sorry about that,
   * and hopefully the users of your plugin won't be sorry about it either.
   */
  documentation: string;
  /** An ordered array of property declarations. */
  properties: ParameterDeclaration[];
};
