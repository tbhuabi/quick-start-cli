const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const globalConfig = require('../global.config');
const path = require('path');

const commonConfig = require('./webpack.common');

let config = Object.assign({}, commonConfig);

let polyfill = 'eventsource-polyfill';
let hotServer = 'webpack/hot/dev-server';
let hotClient = 'webpack-hot-middleware/client?reload=true&path=' + globalConfig.localPath + '__webpack_hmr';
let entry = config.entry;
Object.keys(entry).forEach(function (key) {
    entry[key] = [hotClient, entry[key]];
    if (key == 'app') {
        entry[key].unshift(hotServer);
    }
});
module.exports = webpackMerge(config, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: globalConfig.buildPath,
        publicPath: '/',
        filename: path.posix.join(globalConfig.staticPublicPath, 'js/[name].js'),
        chunkFilename: path.posix.join(globalConfig.staticPublicPath, 'js/[id].chunk.js')
    },
    plugins: [
        new ExtractTextPlugin(path.posix.join(globalConfig.staticPublicPath, 'css/[name].css')),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    // devServer: {
    //     contentBase: "./public",//本地服务器所加载的页面所在的目录
    //     colors: true,//终端中输出结果为彩色
    //     historyApiFallback: true,//不跳转
    //     inline: true//实时刷新
    // }
});
