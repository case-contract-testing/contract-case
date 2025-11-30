import { PluginDslDeclaration } from '../domain/typeSystem/types';

const functions: PluginDslDeclaration = {
  namespace: '_case',
  category: 'convenience',
  matchers: [
    {
      name: 'And',
      type: 'And',
      documentation: `Matches all of the provided matchers. Useful for combining restrictions
  provided by different matchers, or creating new matchers without needing
  plugins.
 
  For best results, wrap the And matcher in a WithExample matcher.`,
      params: [
        {
          name: 'children',
          documentation:
            ' An array of the matchers to run against this particular spot in the tree',
          type: { kind: 'array', type: 'AnyCaseMatcherOrData' },
        },
      ],
    },
    {
      name: 'ChangeLogLevel',
      type: 'CascadingContext',
      documentation: `Alters the ContractCase log level below this matcher. Useful for debugging.
 
 This has no effect on matching.
 
 Note that this log level matcher will be saved into the contract, so it will also affect the log level during verification. Usually you will want to remove the use of this matcher before saving the contract.`,
      params: [
        {
          name: 'logLevel',
          jsonPropertyName: '_case:currentRun:context:logLevel',
          documentation:
            'The new LogLevel. One of "none" | "error" | "warn" | "debug" | "maintainerDebug" | "deepMaintainerDebug". see [LogLevel](https://case.contract-testing.io/docs/reference/configuring#loglevel-none--error--warn--debug--maintainerdebug) for details',
          type: 'string',
        },
        {
          name: 'child',
          documentation: 'The next matcher in the tree.',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
    {
      name: 'NamedMatch',
      type: 'Lookup',
      documentation: `Saves the matcher below it with a unique name that can be used with lookups
  in tests after this one. Lookups can be made with the ReferenceMatch matcher. `,
      params: [
        {
          name: 'uniqueName',
          documentation:
            'The name you can use to lookup this matcher later. If you have two matcher with the same unique name, their contents must be identical.',
          type: 'string',
        },
        {
          name: 'child',
          documentation: 'The next matcher in the tree.',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
    {
      name: 'ReferenceMatch',
      type: 'Lookup',
      documentation: `Matches a named matcher created with the NamedMatch matcher.`,
      params: [
        {
          name: 'uniqueName',
          documentation: 'The name you gave to a previous call of NamedMatch',
          type: 'string',
        },
      ],
    },
    {
      name: 'StateVariable',
      type: 'ContextVariable',
      documentation: `Matches the content of a variable that comes from a state. See [state definitions](https://case.contract-testing.io/docs/defining-contracts/state-definitions) and [state handlers](https://case.contract-testing.io/docs/reference/state-handlers) for more details.`,
      params: [
        {
          name: 'variableName',
          documentation: 'The name of the variable',
          type: 'string',
        },
      ],
    },
    {
      name: 'WithExample',
      type: 'CascadingContext',
      documentation: `Adds an example to the provided matcher. Useful when you have a complicated
set of constraints and ContractCase can't figure out what the best example should be. 
 
The most common use case for this matcher is for providing a clear example for array matchers.

The provided example must be matchable by the child matcher. 
 
Note that WithExample completely overrides the generated example that would normally be produced by the child matcher.`,
      params: [
        {
          name: 'child',
          documentation: 'The matcher to add an example to',
          type: 'AnyCaseMatcherOrData',
        },
        {
          name: 'example',
          documentation: 'The example to use when stripping the matchers',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
  ],
  interactions: [],
};

export default functions;
