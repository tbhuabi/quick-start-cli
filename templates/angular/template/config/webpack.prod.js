const ngAot = require('@ngtools/webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const globalConfig = require('../global.config');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: globalConfig.buildPath,
    publicPath: globalConfig.onlinePublishPathPrefix,
    filename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].[hash].js'),
    chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].[hash].chunk.js')
  },
  plugins: [
    new ngAot.AngularCompilerPlugin({
      tsConfigPath: path.resolve(__dirname, '../tsconfig.json'),
      entryModule: path.join(globalConfig.appPath, './app/app.module#AppModule'),
      sourceMap: true
    }),
    new MiniCssExtractPlugin({
      filename: path.posix.join(globalConfig.staticPublicPath, 'css/[name].[hash].css'),
      chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'css/[id].[hash].css')
    })
  ],
  optimization: {
    minimizer: [new TerserWebpackPlugin({
      terserOptions: {
        ecma: undefined,
        warnings: false,
        parse: {},
        compress: {},
        mangle: true,
        module: false,
        output: {
          comments: false
        },
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false
      }
    }), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /\/node_modules\/@angular.*\.(js|ts)$/,
          name: 'vendor',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 10,
          priority: 2
        },
        polyfills: {
          chunks: 'all',
          test: /\/node_modules\/(core-js|zone\.js)/,
          name: 'polyfills',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 2
        }
      }
    }
  }
});
