const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoader = require('vue-loader');
const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');

const globalConfig = require('../global.config');
const appPath = globalConfig.appPath;
const isProduction = process.env.NODE_ENV === 'production';
const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(appPath, '../node_modules')];

module.exports = {
  entry: {
    vendor: ['vue', 'vue-router'],
    app: path.resolve(appPath, 'app.js')
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [{
      test: /\.(vue|js)$/,
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }],
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: appPath
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(globalConfig.staticPublicPath, `img/[name]${isProduction ? '.[hash]' : ''}.[ext]`),
          esModule: false
        }
      }]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: isProduction
        }
      }]
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(globalConfig.staticPublicPath, `fonts/[name]${isProduction ? '.[hash]' : ''}.[ext]`),
          esModule: false
        }
      }]
    }, {
      test: cssTest(cssConfig.language),
      include: publicPaths,
      use: [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [require('autoprefixer')];
          }
        }
      }, cssConfig.language + '-loader']
    }, {
      test: cssTest(cssConfig.language),
      exclude: publicPaths,
      use: ['vue-style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [require('autoprefixer')];
          }
        }
      }, cssConfig.language + '-loader']
    }]
  },
  plugins: [
    new VueLoader.VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(appPath, 'index.html'),
      favicon: path.resolve(appPath, 'assets/images/favicon.ico')
    })
  ]
};
