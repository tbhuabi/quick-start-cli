const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common.js')
const path = require('path')
const globalConfig = require('../global.config')

const ENV = process.env.NODE_ENV = process.env.ENV = 'production'

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: globalConfig.buildPath,
    publicPath: globalConfig.onlinePublishPathPrefix,
    filename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].[hash].js'),
    chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'js/[id].[hash].chunk.js')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.posix.join(globalConfig.staticPublicPath, 'css/[name].[hash].css'),
      chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'css/[id].[hash].css')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /\/node_modules\/.*\.(js|ts)$/,
          name: 'vendor',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 10,
          priority: 2
        }
      }
    }
  }
})
