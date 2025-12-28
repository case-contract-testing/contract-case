import {
  CaseCoreError,
  MatcherReference,
} from '@contract-case/case-plugin-base';
import { functionNameFor, importModuleFor, toInterfaceName } from './renderers';

export type ImportContext = {
  addMatcher: (matcherReference: MatcherReference) => void;
  getImports: () => Record<string, Set<string>>;
  addNamedImport: (name: string, module: string) => void;
};

export const createImportContext = (
  rootCategory: string,
  currentKind: 'matcher' | 'interaction' | 'state',
): ImportContext => {
  const imports: Record<string, Set<string>> = {};

  let complete = false;

  return {
    addMatcher: (matcherReference: MatcherReference) => {
      if (complete) {
        throw new CaseCoreError(
          `Matcher reference '${matcherReference.name}' from '${matcherReference.category}' in ${matcherReference.namespace} can't be added after getImports() has been called. This is a bug in the typescript generator.`,
        );
      }
      const module = importModuleFor(matcherReference, {
        rootCategory,
        currentKind,
      });
      if (!imports[module]) {
        imports[module] = new Set();
      }
      imports[module].add(functionNameFor(matcherReference));
      imports[module].add(toInterfaceName(matcherReference));
    },
    addNamedImport: (name: string, module: string): void => {
      if (complete) {
        throw new CaseCoreError(
          `Named import '${name}' from '${module}' can't be added after getImports() has been called. This is a bug in the typescript generator.`,
        );
      }
      if (!imports[module]) {
        imports[module] = new Set();
      }
      imports[module].add(name);
    },
    getImports: () => {
      complete = true;
      return imports;
    },
  };
};
