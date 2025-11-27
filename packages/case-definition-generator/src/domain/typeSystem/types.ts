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
  /**
   * An array of all the matcher DSL objects declared by this
   * plugin.
   *
   * Note that these don't need to map 1:1 to your matcher
   * executors.
   */
  matchers: MatcherDslDeclaration[];
  states?: StateObjectDeclaration[];
};

/**
 * ParameterType tells us what type a parameter is.
 *
 * Possible string values:
 * - `'AnyCaseMatcherOrData'`: Matches arbitrary
 *    data or a ContractCase matcher.
 *    This is ContractCase's most generic unknown type.
 * - `'AnyData'`: Matches any data value only, ie, can't be a matcher.
 * - `'integer'`: Matches integer numbers
 * - `'string'`: Matches string values
 * - `'boolean'`: Matches boolean values
 * - `'number'`: Matches any numeric value.
 *    Because the contract serialises to json, this
 *    practically means double precision floating point; although
 *    the json spec doesn't actually specify, most implementations
 *    are restricted to double precision floating point.
 * - `'null'`: Matches `null` values. Friends don't let friends match
 *    null values.
 *
 * See {@link TypeContainer} for complex types.
 */
export type ParameterType =
  | TypeContainer
  | 'AnyCaseMatcherOrData'
  | 'AnyData'
  | 'integer'
  | 'string'
  | 'boolean'
  | 'number'
  | 'null';

/**
 * Indicates a container type.
 *
 * Currently only supports arrays, but in the future may allow specific
 * matchers.
 *
 * Implementations should switch on `kind` and fail if they get a kind that they
 * don't recognise.
 *
 * If you have a use-case that needs more complex container types, please raise
 * an issue.
 */
export type TypeContainer = {
  /** What kind of container this is. Future unions of this type will always have this parameter */
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
  /** The name of the parameter, used for documentation, actual method
   * declaration, and any builders.
   *
   * Note that there are some reserved names or names with side effects:
   *
   * - `type`: Reserved for the matcher type.
   * - `example`: Allowed, but will be used as the rendered example for this node.
   * - `resolvesTo`: Allowed, but will control what ContractCase thinks the example's type is.
   */
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

/** Defines an object. */
export type DslObjectDeclaration = {
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
   * Documentation for this object. Yes, this is required. We're not sorry about that,
   * and hopefully the users of your plugin won't be sorry about it either.
   */
  documentation: string;

  /** An ordered array of parameter declarations. If any parameters are optional, they must be at the end. */
  params: ParameterDeclaration[];
};

/**
 * Defines the DSL for a matcher.
 *
 * Note that more than one Matcher DSL can point
 * to the same matcher implementation - that is, you might have
 * multiple DSL objects with the same type.
 */
export type MatcherDslDeclaration = DslObjectDeclaration & {
  /**
   * A map of constant parameters to add to the matcher. These are parameters that are always the same for all instances of the matcher.
   *
   * See the notes about reserved names on {@link ParameterDeclaration}
   *
   * Currently only strings are supported. If you have a more complex use case, please raise an issue.
   */
  constantParams?: Record<string, string | null> & {
    /**
     * If specified, sets the `matcher:resolvesTo` value.
     *
     * This tells ContractCase that the example will always resolve to this specific type.
     */
    resolvesTo?: Extract<
      ParameterType,
      'string' | 'boolean' | 'number' | 'integer' | 'null'
    >;
  };
  /**
   * A map of context modifiers to add to the context object.
   * These control ContractCase's matching behaviour
   */
  contextModifiers?: Record<string, string>;
  /**
   * A map of modifiers to add to the current run context. These can be used to
   * add matchers that change the user configuration below it. Most of the time you won't need to provide these.
   */
  currentRunModifiers?: Record<string, string>;
};

export type StateObjectDeclaration = DslObjectDeclaration;
