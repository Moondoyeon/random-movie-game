module.exports = {
  plugins: [
    '@emotion',
    '@babel/plugin-proposal-private-property-in-object',
    '@babel/plugin-syntax-flow',
  ],
  presets: [
    [
      '@babel/preset-react',
      { runtime: 'automatic', importSource: '@emotion/react' },
    ],
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
