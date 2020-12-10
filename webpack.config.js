const baseConfig = require('./internals/webpack/webpack.base.babel');
const devConfig = require('./internals/webpack/webpack.dev.babel');
const prodConfig = require('./internals/webpack/webpack.prod.babel');

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production';

  return baseConfig(isProd ? prodConfig : devConfig);
};
