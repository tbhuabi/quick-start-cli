const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');

const globalConfig = require('../global.config');
const appPath = globalConfig.appPath;
const isProduction = process.env.NODE_ENV === 'production';
const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(appPath, '../node_modules')];

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        app: path.resolve(appPath, 'app.jsx')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: [{
                loader: 'eslint-loader',
                options: {
                    configFile: path.resolve(__dirname, '../.eslintrc')
                }
            }]
        }, {
            test: /\.jsx?$/,
            include: appPath,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-3'],
                    compact: false
                }
            }, './config/react-hot-loader']
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
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins() {
                            return [require('autoprefixer')];
                        }
                    }
                }, `${cssConfig.language}-loader`]
            })
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            use: ['style-loader', {
                loader: 'css-loader?modules&localIdentName=[name]__[local]'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins() {
                        return [require('autoprefixer')];
                    }
                }
            }, `${cssConfig.language}-loader`]
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