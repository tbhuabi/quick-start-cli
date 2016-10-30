const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');

const appPath = path.resolve(__dirname, '../src');
const globalConfig = require('../global.config');
const isProduction = process.env.NODE_ENV == 'production';
const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(appPath, '../node_modules')];

module.exports = {
    entry: {
        vendor: ['vue', 'vue-router'],
        app: path.resolve(appPath, 'app.js')
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        preLoaders: [{
            test: /\.vue$/,
            loader: 'eslint',
            include: appPath,
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: 'eslint',
            include: appPath,
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            include: appPath
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: path.posix.join(globalConfig.staticPublicPath, `img/[name]${isProduction ? '.[hash]' : ''}.[ext]`)
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: path.posix.join(globalConfig.staticPublicPath, `fonts/[name]${isProduction ? '.[hash]' : ''}.[ext]`)
            }
        }, {
            test: cssTest(cssConfig.language),
            include: publicPaths,
            loader: ExtractTextPlugin.extract('vue-style', `css!postcss${cssConfig.language ? '!' + cssConfig.language : ''}?sourceMap`)
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            loader: `vue-style!css!postcss${cssConfig.language ? '!' + cssConfig.language : ''}?sourceMap`
        }]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    postcss() {
        return [require('autoprefixer')];
    },
    vue: {
        loaders: `vue-style!css!postcss${cssConfig.language ? '!' + cssConfig.language : ''}?sourceMap`,
        postcss: [
            require('autoprefixer')
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(appPath, 'index.html'),
            favicon: path.resolve(appPath, 'assets/images/favicon.ico')
        })
    ]
};