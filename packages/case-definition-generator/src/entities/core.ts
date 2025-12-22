import { PluginDslDeclaration } from '@contract-case/case-plugin-base';

const core: PluginDslDeclaration = {
  namespace: '_case',
  category: 'core',
  matchers: [],
  states: [
    {
      name: 'InState',
      type: 'NamedState',
      params: [
        {
          name: 'stateName',
          jsonPropertyName: 'stateName',
          documentation: `The name of the state used by this example. 
This must match one of the state handlers provided in the configuration during the
example run.`,
          type: 'string',
        },
      ],
      documentation: `A state descriptor for configuring an example
      that needs to run in a particular named state.`,
    },
    {
      name: 'InStateWithVariables',
      type: 'StateWithVariables',
      params: [
        {
          name: 'stateName',
          jsonPropertyName: 'stateName',
          documentation: `The name of the state used by this example. 
This must match one of the state handlers provided in the configuration during the
example run.`,
          type: 'string',
        },
        {
          name: 'variables',
          jsonPropertyName: 'variables',
          documentation: `A object where the keys are variable names, mapped to any data or matcher objects.`,
          type: 'AnyCaseMatcherOrData',
        },
      ],
      documentation: `A state descriptor for configuring an example
      that needs to run in a particular named state.`,
    },
  ],
  interactions: [],
};

export default core;
