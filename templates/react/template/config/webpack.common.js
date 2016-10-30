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
        vendor: ['react', 'react-dom'],
        app: path.resolve(appPath, 'app.jsx')
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: 'eslint'
        }],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: appPath,
            query: {
                presets: ['es2015', 'react', 'stage-3'],
                compact: false
            }
        }, {
            test: /\.html$/,
            loader: 'html'
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
            loader: ExtractTextPlugin.extract('style', `css!postcss${cssConfig.language ? '!' + cssConfig.language : ''}?sourceMap`)
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            loader: `style!css?modules&localIdentName=[name]__[local]!postcss${cssConfig.language ? '!' + cssConfig.language : ''}?sourceMap`
        }]
    },
    eslint: {
        configFile: path.resolve(__dirname, '../.eslintrc')
    },
    postcss() {
        return [require('autoprefixer')];
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