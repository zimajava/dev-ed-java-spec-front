/* eslint consistent-return:0 import/order:0 */
const { resolve } = require('path');
const express = require('express');

const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const app = express();

// define the react-application here
app.use(express.static(resolve(process.cwd(), 'build'))); // optionally one can add some route handler to protect this resource?

// In production we need to pass these values in instead of relying on webpack
setup(app, { outputPath: resolve(process.cwd(), 'build'), publicPath: '/' });

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
