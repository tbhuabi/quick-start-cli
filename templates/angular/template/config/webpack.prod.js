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
        chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'js/[id].[hash].chunk.js')
    },
    plugins: [
        new ngAot.AngularCompilerPlugin({
            tsConfigPath: path.resolve(__dirname, '../tsconfig.json'),
            entryModule: 'src/app/app.module#AppModule',
            sourceMap: true
        }),
        new ExtractTextPlugin(path.posix.join(globalConfig.staticPublicPath, 'css/[name].[hash].css'))
    ]
});
