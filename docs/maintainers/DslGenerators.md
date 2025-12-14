## DSL Generators

ContractCase has a new DSL system, which allows matcher generation
from a json definition, consumed by the `@contract-case/case-definition-generator` package.

Properties that the generated matchers must support in order for the generator's type system to make sense:

- It must have a constructor which takes an ordered list of arguments. This is used for the passToMatcher type, which allows defining composite matchers.
