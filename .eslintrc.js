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
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // 일관된 줄끝
    semi: 'off',
    'no-undef': 'off',

    indent: 'off',
    '@typescript-eslint/indent': 'off',

    '@typescript-eslint/no-unused-vars': 'warn',

    'react/react-in-jsx-scope': 'off',

    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
};
