/*!
 * ContractCase eslint settings for maintainers
 * Copyright(c) 2022-2024 Timothy Jones (TLJ)
 * BSD-3-Clause license
 */

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  plugins: ['import', '@typescript-eslint', 'eslint-plugin-tsdoc'],
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  ignorePatterns: ['jest.config.ts'],
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
  },

  overrides: [
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

        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
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
    {
      extends: 'plugin:jest/recommended',
      files: ['**/*.test.ts', '**/*.spec.ts'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'no-unused-expressions': 'off',
        'no-restricted-imports': 'off',
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
  ],
};
