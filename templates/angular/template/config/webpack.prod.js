const webpack = require('webpack');
const ngAot = require('@ngtools/webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const globalConfig = require('../global.config');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        path: globalConfig.buildPath,
        publicPath: globalConfig.onlinePublishPathPrefix,
        filename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].[hash].js'),
        chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'js/[id].[hash].chunk.js')
    },
    plugins: [
        new ngAot.AngularCompilerPlugin({
            tsConfigPath: path.resolve(__dirname, '../tsconfig.json'),
            entryModule: 'src/app/app.module#AppModule',
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new ExtractTextPlugin(path.posix.join(globalConfig.staticPublicPath, 'css/[name].[hash].css')),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            }
        })
    ]
});
