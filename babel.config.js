module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'react-hot-loader/babel',
    'babel-plugin-macros',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime',
    'transform-react-remove-prop-types',
  ],
};
