const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');

const appPath = path.resolve(__dirname, '../src');
const globalConfig = require('../global.config');
const isProduction = process.env.NODE_ENV === 'production';
const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(appPath, '../node_modules')];

module.exports = {
    entry: {
        vendor: ['vue', 'vue-router'],
        app: path.resolve(appPath, 'app.js')
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue'
        }
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
            include: appPath,
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
            use: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: ['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins() {
                            return [require('autoprefixer')];
                        }
                    }
                }, cssConfig.language + '-loader']
            })
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
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(appPath, 'index.html'),
            favicon: path.resolve(appPath, 'assets/images/favicon.ico')
        })
    ]
};