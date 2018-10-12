const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const globalConfig = require('../global.config');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const clientPath = globalConfig.clientPath;

const commonStaticPaths = [path.resolve(clientPath, 'assets'), path.resolve(__dirname, '../node_modules')];

module.exports = {
  entry: {
    polyfills: path.resolve(clientPath, 'polyfills.ts'),
    app: path.resolve(clientPath, 'main.ts')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: [{
        loader: 'tslint-loader',
        options: {
          configuration: require('../views/tslint.json'),
          emitErrors: false,
          failOnHint: false,
          formatter: 'tslint-formatter-eslint-style'
        }
      }]
    }, {
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: isProduction ? ['@ngtools/webpack'] : ['ng-router-loader', 'awesome-typescript-loader', 'angular2-template-loader', {
        loader: 'angular-hot-reload-loader',
        options: {
          rootModule: path.join(clientPath, './app/app.module#AppModule')
        }
      }]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: isProduction,
          removeAttributeQuotes: !isProduction,
          caseSensitive: isProduction
        }
      }]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(globalConfig.staticPublicPath, `img/[name]${isProduction ? '.[hash]' : ''}.[ext]`)
        }
      }],
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(globalConfig.staticPublicPath, `fonts/[name]${isProduction ? '.[hash]' : ''}.[ext]`)
        }
      }],
    }, {
      test: cssTest(cssConfig.language),
      include: commonStaticPaths,
      use: isProduction ? [MiniCssExtractPlugin, {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [require('autoprefixer')];
            }
          }
        }].concat(`${cssConfig.language ? cssConfig.language + '-loader' : ''}`)
        : ['style-loader', 'css-loader?sourceMap', {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [require('autoprefixer')];
            },
            sourceMap: true
          }
        }].concat(`${cssConfig.language ? cssConfig.language + '-loader?sourceMap' : ''}`)
    }, {
      test: cssTest(cssConfig.language),
      exclude: commonStaticPaths,
      use: ['to-string-loader', {
        loader: 'css-loader',
        options: {
          minimize: isProduction,
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [require('autoprefixer')];
          },
          sourceMap: true
        }
      }, `${cssConfig.language ? cssConfig.language + '-loader?sourceMap' : ''}`]
    }]
  },
  plugins: [
    new FilterWarningsPlugin({
      exclude: /System.import\(\) is deprecated and will be removed soon. Use import\(\) instead\./
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(clientPath, 'index.html'),
      favicon: path.resolve(clientPath, 'assets/images/favicon.ico'),
      chunksSortMode(n, m) {
        let order = ['polyfills', 'vendor', 'app'];
        let order1 = order.indexOf(n.names[0]);
        let order2 = order.indexOf(m.names[0]);
        return order1 - order2;
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(isProduction ? 'production' : 'development'),
        PATH_PREFIX: JSON.stringify(globalConfig.onlinePublishPathPrefix)
      }
    })
  ]
};
