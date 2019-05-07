const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const cssConfig = require('./css-config.json')
const cssTest = require('./css-test')

const globalConfig = require('../global.config')
const appPath = globalConfig.appPath
const isProduction = process.env.NODE_ENV === 'production'
const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(appPath, '../node_modules')]

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: path.resolve(appPath, 'main.tsx')
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: [{
        loader: 'tslint-loader',
        options: {
          configuration: require('../tslint.json'),
          emitErrors: false,
          failOnHint: false,
          formatter: 'tslint-formatter-eslint-style'
        }
      }]
    }, {
      test: /\.tsx?$/,
      include: appPath,
      use: ['babel-loader']
    }, {
      test: /\.html$/,
      use: ['html-loader']
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(globalConfig.staticPublicPath, `img/[name]${isProduction ? '.[hash]' : ''}.[ext]`)
        }
      }]
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(globalConfig.staticPublicPath, `fonts/[name]${isProduction ? '.[hash]' : ''}.[ext]`)
        }
      }]
    }, {
      test: cssTest(cssConfig.language),
      include: publicPaths,
      use: [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [require('autoprefixer')]
          }
        }
      }, `${cssConfig.language}-loader`]
    }, {
      test: cssTest(cssConfig.language),
      exclude: publicPaths,
      use: ['style-loader', {
        loader: 'css-loader?modules&localIdentName=[name]__[local]'
      }, {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [require('autoprefixer')]
          }
        }
      }, `${cssConfig.language}-loader`]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appPath, 'index.html'),
      favicon: path.resolve(appPath, 'assets/images/favicon.ico')
    })
  ]
}