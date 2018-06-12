const ngAot = require('@ngtools/webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const globalConfig = require('../global.config');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: globalConfig.buildPath,
        publicPath: globalConfig.onlinePublishPathPrefix,
        filename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].[hash].js'),
        chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].[hash].chunk.js')
    },
    plugins: [
        new ngAot.AngularCompilerPlugin({
            tsConfigPath: path.resolve(__dirname, '../tsconfig.json'),
            entryModule: 'src/app/app.module#AppModule',
            sourceMap: true
        }),
        new ExtractTextPlugin(path.posix.join(globalConfig.staticPublicPath, 'css/[name].[hash].css'))
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    test: /\/node_modules\/@angular.*\.(js|ts)$/,
                    name: 'vendor',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 10,
                    priority: 2
                },
                polyfills: {
                    chunks: 'all',
                    test: /\/node_modules\/(core-js|zone\.js)/,
                    name: 'polyfills',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 2
                }
            }
        }
    }
});
