/**
 * LanguageTypes is a mapping of the types used in the DSL to the types used in
 * the target language.
 */
export type LanguageTypes = {
  /**
   * Converts a type to an array of that type
   * @param type - The type to convert
   * @returns The string representation, eg `type[]` or `List<type>`, depending on the language
   */
  array: (type: string) => string;
  /**
   * The string representation of the type for data (eg, concrete test data)
   */
  data: string;
  /**
   * The string representation of the matcher type in the target language.
   * In some languages, this will be the base object type. In others, it will be
   * a specific matcher type.
   */
  matcher: string;
};
