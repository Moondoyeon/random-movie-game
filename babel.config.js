module.exports = {
  plugins: [
    '@babel/plugin-proposal-private-property-in-object',
    '@babel/plugin-syntax-flow',
    // '@babel/plugin-transform-react-jsx',
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
