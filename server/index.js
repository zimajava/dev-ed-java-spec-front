/* eslint consistent-return:0 import/order:0 */
const { resolve } = require('path');
const express = require('express');

const logger = require('./logger');
const setup = require('./middlewares/frontendMiddleware');

const customHost = process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = express();

app.use(express.static(resolve(process.cwd(), 'build')));

setup(app, { outputPath: resolve(process.cwd(), 'build'), publicPath: '/' });

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
