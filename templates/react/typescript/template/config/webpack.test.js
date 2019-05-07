const path = require('path')
const cssConfig = require('./css-config.json')
const cssTest = require('./css-test')
const globalConfig = require('../global.config')
const appPath = globalConfig.appPath

const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(__dirname, '../node_modules')]

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: appPath,
      use: ['awesome-typescript-loader']
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'url-loader'
    }, {
      test: cssTest(cssConfig.language),
      include: publicPaths,
      use: ['style-loader', 'css-loader', cssConfig.language + '-loader']
    }, {
      test: cssTest(cssConfig.language),
      exclude: publicPaths,
      use: ['style-lader', 'css-loader?modules&localIdentName=[name]__[local]', cssConfig.language + '-loader']
    }]
  }
}
