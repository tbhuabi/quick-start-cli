const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const globalConfig = require('../global.config');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');

const isProduction = process.env.NODE_ENV == 'production';

const appPath = globalConfig.appPath;


const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(__dirname, '../node_modules')];


module.exports = {
    entry: {
        polyfills: path.resolve(appPath, 'polyfills.ts'),
        vendor: path.resolve(appPath, 'vendor.ts'),
        app: path.resolve(appPath, 'main.ts')
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            enforce: 'pre',
            use: [{
                loader: 'tslint-loader',
                options: {
                    configuration: require('./tslint.json'),
                    emitErrors: false,
                    failOnHint: false,
                    formatter: 'tslint-formatter-eslint-style'
                }
            }]
        }, {
            test: /\.ts$/,
            use: ['awesome-typescript-loader',  'angular2-template-loader']
        }, {
            test: /\.html$/,
            loader: 'html-loader'
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
                }, `${cssConfig.language ? cssConfig.language + '-loader?sourceMap' : ''}`]
            })
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            use: ['to-string-loader', 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins() {
                        return [require('autoprefixer')];
                    }
                }
            }, `${cssConfig.language ? cssConfig.language + '-loader?sourceMap' : ''}`]
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(appPath, 'index.html'),
            favicon: path.resolve(appPath, 'assets/images/favicon.ico')
        })
    ]
};
