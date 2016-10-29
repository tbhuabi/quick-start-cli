const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const globalConfig = require('../global.config');
const path = require('path');

const commonConfig = require('./webpack.common');

let config = Object.assign({}, commonConfig);

let polyfill = 'eventsource-polyfill';
let hotServer = 'webpack/hot/dev-server';
let hotClient = 'webpack-hot-middleware/client?reload=true&path=' + globalConfig.localPath + '__webpack_hmr'
let entry = config.entry;
Object.keys(entry).forEach(function (key) {
    typeof entry[key] === 'string' ? entry[key] = [hotClient, entry[key]] : entry[key].unshift(hotClient);
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
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
});
