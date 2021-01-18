/* eslint-disable global-require */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    throw new Error('For dev mode use react-scripts');
  }

  return app;
};
