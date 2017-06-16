const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');
const globalConfig = require('../global.config');
const appPath = path.resolve(__dirname, '../src');

const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(__dirname, '../node_modules')];

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: appPath
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join(globalConfig.staticPublicPath, `img/[name].[ext]`)
                }
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join(globalConfig.staticPublicPath, `fonts/[name].[ext]`)
                }
            }]
        }, {
            test: cssTest(cssConfig.language),
            include: publicPaths,
            use: ['vue-style-loader', 'css-loader', cssConfig.language + '-loader']
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            use: ['vue-style-loader', 'css-loader', cssConfig.language + '-loader']
        }]
    }
};
