import { PluginDslDeclaration } from '../domain/typeSystem/types';

const modifiers: PluginDslDeclaration = {
  namespace: '_case',
  category: 'modifiers',
  matchers: [
    {
      name: 'ExactlyLike',
      type: 'CascadingContext',
      documentation: `Everything inside this matcher will be matched exactly, unless overridden
  with a generic matcher (eg \`AnyString\` or\` ShapedLike\`). Use this to switch
  out of \`shapedLike\` and back to the default exact matching.`,
      contextModifiers: {
        matchBy: 'exact',
      },
      params: [
        {
          name: 'child',
          documentation:
            'The object, array, primitive or matcher to match exactly',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
    {
      name: 'ShapedLike',
      type: 'CascadingContext',
      documentation: `Everything inside this matcher will be matched on the shape of the data (ie,
  type alone), unless overridden with other matchers. Use this to switch out of the default \`exactlyLike\` matching.`,
      contextModifiers: {
        matchBy: 'type',
      },
      params: [
        {
          name: 'child',
          documentation:
            'The object, array, primitive or matcher to match the shape against',
          type: 'AnyCaseMatcherOrData',
        },
      ],
    },
  ],
  dataObjects: [],
};

export default modifiers;
