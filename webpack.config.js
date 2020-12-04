// const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';
// const ROOT_DIR = fs.realpathSync(process.cwd());

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: '',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         postcssOptions: {
      //           plugins: ['autoprefixer'],
      //           // plugins: () => [
      //           //   autoprefixer({})
      //           // ]
      //         },
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   loader: 'url-loader?limit=10000&name=img/[name].[ext]',
      // },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      __DEV__: isDevMode,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 8090,
    compress: true,
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    historyApiFallback: true,
  },
};
