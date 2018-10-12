const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const globalConfig = require('../global.config');
const path = require('path');

const commonConfig = require('./webpack.common');

let config = Object.assign({}, commonConfig);

let entry = config.entry;
Object.keys(entry).forEach(function (key) {
  entry[key] = ['eventsource-polyfill', 'webpack-hot-middleware/client'].concat(entry[key]);
});
module.exports = webpackMerge(config, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: globalConfig.buildPath,
    publicPath: '/',
    filename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].js'),
    chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'js/[id].chunk.js')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.posix.join(globalConfig.staticPublicPath, 'css/[name].css'),
      chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'css/[id].css')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, globalConfig.appPath)
  ]
});
