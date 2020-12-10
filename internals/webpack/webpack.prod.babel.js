// Important modules this config uses
const { /* resolve, */ join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
// const OfflinePlugin = require('offline-plugin');
const { ids } = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: join(process.cwd(), 'src/index.jsx'),

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // new WebpackPwaManifest({
    //   name: 'React Boilerplate',
    //   short_name: 'React BP',
    //   description: 'My React Boilerplate-based project!',
    //   background_color: '#fafafa',
    //   theme_color: '#b1624d',
    //   inject: true,
    //   ios: true,
    //   icons: [
    //     {
    //       src: resolve('app/images/icon-512x512.png'),
    //       sizes: [72, 96, 128, 144, 192, 384, 512],
    //     },
    //     {
    //       src: resolve('app/images/icon-512x512.png'),
    //       sizes: [120, 152, 167, 180],
    //       ios: true,
    //     },
    //   ],
    // }),

    new ids.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 6,
    }),
  ],

  performance: {
    assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
