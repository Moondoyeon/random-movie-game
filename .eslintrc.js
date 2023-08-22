module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
    browser: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'plugin:react/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],

  plugins: [
    '@typescript-eslint',
    'import',

    'react',
    'react-hooks',
    '@tanstack/query',
    '@emotion',
    'prettier',
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'prettier/prettier': 'error',
    semi: 'off',
    'no-undef': 'off',

    indent: 'off',
    '@typescript-eslint/indent': 'off',

    '@typescript-eslint/no-unused-vars': 'error',

    'react/react-in-jsx-scope': 'off',
  },
};
