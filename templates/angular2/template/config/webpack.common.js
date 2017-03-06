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
        extensions: ['', '.js', '.ts']
    },
    module: {
        preLoaders: [{
            test: /\.ts$/,
            loader: "tslint"
        }],
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.json$/,
            loader: 'json'
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
            loader: `to-string!css!postcss${cssConfig.language ? '!' + cssConfig.language : ''}?sourceMap`
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
    ],
    postcss() {
        return [require('autoprefixer')];
    },
    tslint: {
        configuration: require('./tslint.json'),

        // tslint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // tslint does not interrupt the compilation by default
        // if you want any file with tslint errors to fail
        // set failOnHint to true
        failOnHint: false,

        // name of your formatter (optional)
        formatter: 'tslint-formatter-eslint-style',

        // path to directory containing formatter (optional)
        // formattersDirectory: "node_modules/tslint-loader/formatters/",

        // These options are useful if you want to save output to files
        // for your continuous integration server
        // fileOutput: {
        //     // The directory where each file's report is saved
        //     dir: path.resolve(__dirname, '../tslint-error'),
        //
        //     // The extension to use for each report's filename. Defaults to "txt"
        //     ext: "xml",
        //
        //     // If true, all files are removed from the report directory at the beginning of run
        //     clean: true,
        //
        //     // A string to include at the top of every report file.
        //     // Useful for some report formats.
        //     header: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<checkstyle version=\"5.7\">",
        //
        //     // A string to include at the bottom of every report file.
        //     // Useful for some report formats.
        //     footer: "</checkstyle>"
        // }
    }
};
