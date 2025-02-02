module.exports = {
  root: true,
  env: { es2020: true },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react-refresh', 'react', 'react-native', '@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'import/no-default-export': 'error',
    'react-refresh/only-export-components': ['error', { allowConstantExport: false }],
    'prettier/prettier': ['error'],
    eqeqeq: 'error',
    'no-var': 'error',
    'prefer-const': 'warn',
    'require-await': 'error',
    'no-duplicate-imports': 'warn',
    'default-case': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'error',
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/sort-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-single-element-style-arrays': 'warn',
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [{ pattern: '{react,react-native}', group: 'external', position: 'before' }],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/no-require-imports': 'off',
  },
  overrides: [
    {
      files: ['app/(tabs)/**', 'app/_layout.tsx', 'app/+not-found.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  settings: {
    'import/ignore': ['react-native'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './'], // Root ve node_modules çözümlensin
      },
    },
  },
};
