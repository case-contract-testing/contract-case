const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');
const tsParser = require('@typescript-eslint/parser');
const tsdoc = require('eslint-plugin-tsdoc');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-config-prettier');
const jest = require('eslint-plugin-jest');
const globals = require('globals');
const { languageOptions } = require('eslint-plugin-import/config/flat/react');
/*!
 * ContractCase eslint settings for maintainers
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  js.configs.recommended,
  ...compat.extends('plugin:import/typescript'),
  prettier,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: ['./**/tsconfig.json', './**/tsconfig.spec.json'],
      },
    },
    plugins: { import: importPlugin, '@typescript-eslint': tsPlugin, tsdoc },
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig.json',
        },
      },
    },
    rules: {
      'tsdoc/syntax': 'error',
      '@typescript-eslint/dot-notation': [
        'error',
        { allowIndexSignaturePropertyAccess: true },
      ],
      camelcase: 'off',
      'no-console': 'error',
      'import/prefer-default-export': 'off',
      'import/no-useless-path-segments': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      // Generated below here

      'getter-return': [
        'off',
        {
          allowImplicit: true,
        },
      ],
      'no-const-assign': ['off'],
      'no-dupe-args': ['off'],
      'no-dupe-class-members': ['off'],
      'no-dupe-keys': ['off'],
      'no-func-assign': ['off'],
      'no-import-assign': ['off'],
      'no-new-symbol': ['off'],
      'no-obj-calls': ['off'],
      'no-redeclare': ['off'],
      'no-setter-return': ['off'],
      'no-this-before-super': ['off'],
      'no-undef': ['off'],
      'no-unreachable': ['off'],
      'no-unsafe-negation': ['off'],
      'valid-typeof': [
        'off',
        {
          requireStringLiterals: true,
        },
      ],
      'import/named': ['off'],
      'import/no-named-as-default-member': ['off'],
      'import/no-unresolved': [
        'off',
        {
          commonjs: true,
          caseSensitive: true,
          caseSensitiveStrict: false,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      'default-param-last': ['off'],
      '@typescript-eslint/default-param-last': ['error'],
      'dot-notation': [
        'off',
        {
          allowKeywords: true,
          allowPattern: '',
          allowPrivateClassPropertyAccess: false,
          allowProtectedClassPropertyAccess: false,
          allowIndexSignaturePropertyAccess: false,
        },
      ],
      'lines-between-class-members': [
        'off',
        'always',
        {
          exceptAfterSingleLine: false,
          exceptAfterOverload: true,
        },
      ],

      'no-array-constructor': ['off'],
      '@typescript-eslint/no-array-constructor': ['error'],
      '@typescript-eslint/no-dupe-class-members': ['error'],
      'no-empty-function': [
        'off',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],
      'no-implied-eval': ['off'],
      'no-new-func': ['off'],
      '@typescript-eslint/no-implied-eval': ['error'],
      'no-loss-of-precision': ['off'],
      '@typescript-eslint/no-loss-of-precision': ['error'],
      'no-loop-func': ['off'],
      '@typescript-eslint/no-loop-func': ['error'],
      'no-magic-numbers': [
        'off',
        {
          ignore: [],
          ignoreArrayIndexes: true,
          enforceConst: true,
          detectObjects: false,
        },
      ],
      '@typescript-eslint/no-magic-numbers': [
        'off',
        {
          ignore: [],
          ignoreArrayIndexes: true,
          enforceConst: true,
          detectObjects: false,
        },
      ],
      '@typescript-eslint/no-redeclare': ['error'],
      'no-shadow': ['off'],
      '@typescript-eslint/no-shadow': ['error'],
      'no-throw-literal': ['off'],
      '@typescript-eslint/only-throw-error': ['error'],
      'no-unused-expressions': [
        'off',
        {
          allowShortCircuit: false,
          allowTernary: false,
          allowTaggedTemplates: false,
          enforceForJSX: false,
        },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTernary: false,
          allowTaggedTemplates: false,
          enforceForJSX: false,
        },
      ],
      'no-unused-vars': [
        'off',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      'no-use-before-define': [
        'off',
        {
          functions: true,
          classes: true,
          variables: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: true,
          classes: true,
          variables: true,
        },
      ],
      'no-useless-constructor': ['off'],
      '@typescript-eslint/no-useless-constructor': ['error'],
      'require-await': ['off'],
      '@typescript-eslint/require-await': ['off'],
      'no-return-await': ['off'],
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          mjs: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'test/**',
            'tests/**',
            'spec/**',
            '**/__tests__/**',
            '**/__mocks__/**',
            'test.{js,jsx}',
            'test.{ts,tsx}',
            'test-*.{js,jsx}',
            'test-*.{ts,tsx}',
            '**/*{.,_}{test,spec}.{js,jsx}',
            '**/*{.,_}{test,spec}.{ts,tsx}',
            '**/jest.config.js',
            '**/jest.config.ts',
            '**/jest.setup.js',
            '**/jest.setup.ts',
            '**/vue.config.js',
            '**/vue.config.ts',
            '**/webpack.config.js',
            '**/webpack.config.ts',
            '**/webpack.config.*.js',
            '**/webpack.config.*.ts',
            '**/rollup.config.js',
            '**/rollup.config.ts',
            '**/rollup.config.*.js',
            '**/rollup.config.*.ts',
            '**/gulpfile.js',
            '**/gulpfile.ts',
            '**/gulpfile.*.js',
            '**/gulpfile.*.ts',
            '**/Gruntfile{,.js}',
            '**/Gruntfile{,.ts}',
            '**/protractor.conf.js',
            '**/protractor.conf.ts',
            '**/protractor.conf.*.js',
            '**/protractor.conf.*.ts',
            '**/karma.conf.js',
            '**/karma.conf.ts',
            '**/.eslintrc.js',
            '**/.eslintrc.ts',
          ],
          optionalDependencies: false,
        },
      ],
      strict: ['error', 'never'],
      'import/default': ['off'],
      'import/namespace': ['off'],
      'import/export': ['error'],
      'import/no-named-as-default': ['error'],
      'import/no-deprecated': ['off'],
      'import/no-mutable-exports': ['error'],
      'import/no-commonjs': ['off'],
      'import/no-amd': ['error'],
      'import/no-nodejs-modules': ['off'],
      'import/first': ['error'],
      'import/imports-first': ['off'],
      'import/no-duplicates': ['error'],
      'import/no-namespace': ['off'],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          distinctGroup: true,
          named: false,
          warnOnUnassignedImports: false,
        },
      ],
      'import/newline-after-import': ['error'],
      'import/no-restricted-paths': ['off'],
      'import/max-dependencies': [
        'off',
        {
          max: 10,
        },
      ],
      'import/no-absolute-path': ['error'],
      'import/no-dynamic-require': ['error'],
      'import/no-internal-modules': [
        'off',
        {
          allow: [],
        },
      ],
      'import/unambiguous': ['off'],
      'import/no-webpack-loader-syntax': ['error'],
      'import/no-unassigned-import': ['off'],
      'import/no-named-default': ['error'],
      'import/no-anonymous-default-export': [
        'off',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowLiteral: false,
          allowObject: false,
        },
      ],
      'import/exports-last': ['off'],
      'import/group-exports': ['off'],
      'import/no-default-export': ['off'],
      'import/no-named-export': ['off'],
      'import/no-self-import': ['error'],
      'import/no-cycle': [
        'error',
        {
          maxDepth: '∞',
          ignoreExternal: false,
          allowUnsafeDynamicCyclicDependency: false,
          disableScc: false,
        },
      ],
      'import/dynamic-import-chunkname': [
        'off',
        {
          importFunctions: [],
          webpackChunknameFormat: '[0-9a-zA-Z-_/.]+',
        },
      ],
      'import/no-relative-parent-imports': ['off'],
      'import/no-unused-modules': [
        'off',
        {
          ignoreExports: [],
          missingExports: true,
          unusedExports: true,
        },
      ],
      'import/no-import-module-exports': [
        'error',
        {
          exceptions: [],
        },
      ],
      'import/no-relative-packages': ['error'],
      'arrow-body-style': [
        'error',
        'as-needed',
        {
          requireReturnForObjectLiteral: false,
        },
      ],
      'no-class-assign': ['error'],
      'no-duplicate-imports': ['off'],
      'no-restricted-exports': [
        'error',
        {
          restrictedNamedExports: ['default', 'then'],
        },
      ],
      'no-restricted-imports': [
        'off',
        {
          paths: [],
          patterns: [],
        },
      ],
      'no-useless-computed-key': ['error'],
      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],
      'no-var': ['error'],
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'prefer-numeric-literals': ['error'],
      'prefer-reflect': ['off'],
      'prefer-rest-params': ['error'],
      'prefer-spread': ['error'],
      'prefer-template': ['error'],
      'require-yield': ['error'],
      'sort-imports': [
        'off',
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'symbol-description': ['error'],
      'init-declarations': ['off'],
      'no-catch-shadow': ['off'],
      'no-delete-var': ['error'],
      'no-label-var': ['error'],
      'no-restricted-globals': [
        'error',
        {
          name: 'isFinite',
          message:
            'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
        },
        {
          name: 'isNaN',
          message:
            'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
        },
        'addEventListener',
        'blur',
        'close',
        'closed',
        'confirm',
        'defaultStatus',
        'defaultstatus',
        'event',
        'external',
        'find',
        'focus',
        'frameElement',
        'frames',
        'history',
        'innerHeight',
        'innerWidth',
        'length',
        'location',
        'locationbar',
        'menubar',
        'moveBy',
        'moveTo',
        'name',
        'onblur',
        'onerror',
        'onfocus',
        'onload',
        'onresize',
        'onunload',
        'open',
        'opener',
        'opera',
        'outerHeight',
        'outerWidth',
        'pageXOffset',
        'pageYOffset',
        'parent',
        'print',
        'removeEventListener',
        'resizeBy',
        'resizeTo',
        'screen',
        'screenLeft',
        'screenTop',
        'screenX',
        'screenY',
        'scroll',
        'scrollbars',
        'scrollBy',
        'scrollTo',
        'scrollX',
        'scrollY',
        'self',
        'status',
        'statusbar',
        'stop',
        'toolbar',
        'top',
      ],
      'no-shadow-restricted-names': ['error'],
      'no-undef-init': ['error'],
      'no-undefined': ['off'],
      'capitalized-comments': [
        'off',
        'never',
        {
          line: {
            ignorePattern: '.*',
            ignoreInlineComments: true,
            ignoreConsecutiveComments: true,
          },
          block: {
            ignorePattern: '.*',
            ignoreInlineComments: true,
            ignoreConsecutiveComments: true,
          },
        },
      ],
      'consistent-this': ['off'],
      'func-name-matching': [
        'off',
        'always',
        {
          includeCommonJSModuleExports: false,
          considerPropertyDescriptor: true,
        },
      ],
      'func-names': ['warn'],
      'func-style': ['off', 'expression'],
      'id-denylist': ['off'],
      'id-length': ['off'],
      'id-match': ['off'],
      'line-comment-position': [
        'off',
        {
          position: 'above',
          ignorePattern: '',
          applyDefaultPatterns: true,
        },
      ],
      'lines-around-directive': [
        'error',
        {
          before: 'always',
          after: 'always',
        },
      ],
      'max-depth': ['off', 4],
      'max-lines': [
        'off',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-lines-per-function': [
        'off',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
      'max-nested-callbacks': ['off'],
      'max-params': ['off', 3],
      'max-statements': ['off', 10],
      'multiline-comment-style': ['off', 'starred-block'],
      'new-cap': [
        'error',
        {
          newIsCap: true,
          newIsCapExceptions: [],
          capIsNew: false,
          capIsNewExceptions: [
            'Immutable.Map',
            'Immutable.Set',
            'Immutable.List',
          ],
          properties: true,
        },
      ],
      'newline-after-var': ['off'],
      'newline-before-return': ['off'],
      'no-bitwise': ['error'],
      'no-continue': ['error'],
      'no-inline-comments': ['off'],
      'no-lonely-if': ['error'],
      'no-multi-assign': ['error'],
      'no-negated-condition': ['off'],
      'no-nested-ternary': ['error'],
      'no-new-object': ['error'],
      'no-plusplus': ['error'],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector: 'ForOfStatement',
          message:
            'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
        },
        {
          selector: 'LabeledStatement',
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],
      'no-ternary': ['off'],
      'no-underscore-dangle': [
        'error',
        {
          allow: [],
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true,
          allowAfterThisConstructor: false,
          allowFunctionParams: true,
          enforceInClassFields: false,
          allowInArrayDestructuring: true,
          allowInObjectDestructuring: true,
        },
      ],
      'no-unneeded-ternary': [
        'error',
        {
          defaultAssignment: false,
        },
      ],
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      'padding-line-between-statements': ['off'],
      'prefer-exponentiation-operator': ['error'],
      'prefer-object-spread': ['error'],
      'require-jsdoc': ['off'],
      'sort-keys': [
        'off',
        'asc',
        {
          caseSensitive: false,
          natural: true,
        },
      ],
      'sort-vars': ['off'],
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            exceptions: ['-', '+'],
            markers: ['=', '!', '/'],
          },
          block: {
            exceptions: ['-', '+'],
            markers: ['=', '!', ':', '::'],
            balanced: true,
          },
        },
      ],
      'unicode-bom': ['error', 'never'],
      'callback-return': ['off'],
      'global-require': ['error'],
      'handle-callback-err': ['off'],
      'no-buffer-constructor': ['error'],
      'no-mixed-requires': ['off', false],
      'no-new-require': ['error'],
      'no-path-concat': ['error'],
      'no-process-env': ['off'],
      'no-process-exit': ['off'],
      'no-restricted-modules': ['off'],
      'no-sync': ['off'],
      'for-direction': ['error'],
      'no-async-promise-executor': ['error'],
      'no-await-in-loop': ['error'],
      'no-compare-neg-zero': ['error'],
      'no-cond-assign': ['error', 'always'],
      'no-constant-condition': ['warn'],
      'no-control-regex': ['error'],
      'no-debugger': ['error'],
      'no-dupe-else-if': ['error'],
      'no-duplicate-case': ['error'],
      'no-empty': ['error'],
      'no-empty-character-class': ['error'],
      'no-ex-assign': ['error'],
      'no-extra-boolean-cast': ['error'],
      'no-inner-declarations': ['error'],
      'no-invalid-regexp': ['error'],
      'no-irregular-whitespace': ['error'],
      'no-misleading-character-class': ['error'],
      'no-promise-executor-return': ['error'],
      'no-prototype-builtins': ['error'],
      'no-regex-spaces': ['error'],
      'no-sparse-arrays': ['error'],
      'no-template-curly-in-string': ['error'],
      'no-unreachable-loop': [
        'error',
        {
          ignore: [],
        },
      ],
      'no-unsafe-finally': ['error'],
      'no-unsafe-optional-chaining': [
        'error',
        {
          disallowArithmeticOperators: true,
        },
      ],
      'no-unused-private-class-members': ['off'],
      'no-useless-backreference': ['error'],
      'no-negated-in-lhs': ['off'],
      'require-atomic-updates': ['off'],
      'use-isnan': ['error'],
      'valid-jsdoc': ['off'],
      'accessor-pairs': ['off'],
      'array-callback-return': [
        'error',
        {
          allowImplicit: true,
          checkForEach: false,
          allowVoid: false,
        },
      ],
      'block-scoped-var': ['error'],
      complexity: ['off', 20],
      'class-methods-use-this': [
        'error',
        {
          exceptMethods: [],
          enforceForClassFields: true,
        },
      ],
      'consistent-return': ['error'],
      'default-case': [
        'error',
        {
          commentPattern: '^no default$',
        },
      ],
      'default-case-last': ['error'],
      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore',
        },
      ],
      'grouped-accessor-pairs': ['error'],
      'guard-for-in': ['error'],
      'max-classes-per-file': ['error', 1],
      'no-alert': ['warn'],
      'no-caller': ['error'],
      'no-case-declarations': ['error'],
      'no-constructor-return': ['error'],
      'no-div-regex': ['off'],
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],
      'no-empty-pattern': ['error'],
      'no-eq-null': ['off'],
      'no-eval': ['error'],
      'no-extend-native': ['error'],
      'no-extra-bind': ['error'],
      'no-extra-label': ['error'],
      'no-fallthrough': ['error'],
      'no-global-assign': [
        'error',
        {
          exceptions: [],
        },
      ],
      'no-native-reassign': ['off'],
      'no-implicit-coercion': [
        'off',
        {
          boolean: false,
          number: true,
          string: true,
          allow: [],
        },
      ],
      'no-implicit-globals': ['off'],
      'no-invalid-this': ['off'],
      'no-iterator': ['error'],
      'no-labels': [
        'error',
        {
          allowLoop: false,
          allowSwitch: false,
        },
      ],
      'no-lone-blocks': ['error'],
      'no-multi-str': ['error'],
      'no-new': ['error'],
      'no-new-wrappers': ['error'],
      'no-nonoctal-decimal-escape': ['error'],
      'no-octal': ['error'],
      'no-octal-escape': ['error'],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc',
            'accumulator',
            'e',
            'ctx',
            'context',
            'req',
            'request',
            'res',
            'response',
            '$scope',
            'staticContext',
          ],
        },
      ],
      'no-proto': ['error'],
      'no-restricted-properties': [
        'error',
        {
          object: 'arguments',
          property: 'callee',
          message: 'arguments.callee is deprecated',
        },
        {
          object: 'global',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'self',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'window',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'global',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          object: 'self',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          object: 'window',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          property: '__defineGetter__',
          message: 'Please use Object.defineProperty instead.',
        },
        {
          property: '__defineSetter__',
          message: 'Please use Object.defineProperty instead.',
        },
        {
          object: 'Math',
          property: 'pow',
          message: 'Use the exponentiation operator (**) instead.',
        },
      ],
      'no-return-assign': ['error', 'always'],
      'no-script-url': ['error'],
      'no-self-assign': [
        'error',
        {
          props: true,
        },
      ],
      'no-self-compare': ['error'],
      'no-sequences': ['error'],
      'no-unmodified-loop-condition': ['off'],
      'no-unused-labels': ['error'],
      'no-useless-call': ['off'],
      'no-useless-catch': ['error'],
      'no-useless-concat': ['error'],
      'no-useless-escape': ['error'],
      'no-useless-return': ['error'],
      'no-void': ['error'],
      'no-warning-comments': [
        'off',
        {
          terms: ['todo', 'fixme', 'xxx'],
          location: 'start',
        },
      ],
      'no-with': ['error'],
      'prefer-promise-reject-errors': [
        'error',
        {
          allowEmptyReject: true,
        },
      ],
      'prefer-named-capture-group': ['off'],
      'prefer-regex-literals': [
        'error',
        {
          disallowRedundantWrapping: true,
        },
      ],
      radix: ['error'],
      'require-unicode-regexp': ['off'],
      'vars-on-top': ['error'],
      yoda: ['error'],
      '@typescript-eslint/ban-ts-comment': ['error'],
      '@typescript-eslint/no-restricted-types': ['error'],
      '@typescript-eslint/no-duplicate-enum-values': ['error'],
      '@typescript-eslint/no-extra-non-null-assertion': ['error'],
      '@typescript-eslint/no-misused-new': ['error'],
      '@typescript-eslint/no-namespace': ['error'],
      '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
      '@typescript-eslint/no-this-alias': ['error'],
      '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
      '@typescript-eslint/no-unsafe-declaration-merging': ['error'],
      '@typescript-eslint/no-var-requires': ['error'],
      '@typescript-eslint/prefer-as-const': ['error'],
      '@typescript-eslint/triple-slash-reference': ['error'],
      'no-new-native-nonconstructor': ['off'],
    },
  },
  {
    files: ['src/**/*.ts'],
  },
  {
    files: ['example/**/*.ts'],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      project: 'example/tsconfig.json',
    },
    rules: {
      'no-restricted-imports': ['error', { patterns: ['src/connectors/*'] }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'no-console': 'off',
    },
  },
  {
    files: ['src/__tests__/**/*.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },

  {
    files: ['src/connectors/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: ['**/boundaries', '**/boundaries/*'] },
      ],
    },
  },
  {
    files: ['src/core/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '**/connectors',
            '**/connectors/*',
            '**/boundaries',
            '**/boundaries/*',
          ],
        },
      ],
    },
  },
  {
    files: ['src/diffmatch/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '**/core',
            '**/core/*',
            '**/connectors',
            '**/connectors/*',
            '**/boundaries',
            '**/boundaries/*',
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '**/diffmatch',
            '**/diffmatch/*',
            '**/core',
            '**/core/*',
            '**/connectors',
            '**/connectors/*',
            '**/boundaries',
            '**/boundaries/*',
          ],
        },
      ],
    },
  },
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  ...compat.extends('plugin:jest/recommended'),
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: { jest },
    rules: {
      ...(jest.configs['flat/recommended'].rules ?? {}),
      'no-unused-expressions': 'off',
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      '@typescript-eslint/no-explicit-any': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/expect-expect': [
        'error',
        { assertFunctionNames: ['expect', 'expectErrorContaining'] },
      ],
    },
  },
];
