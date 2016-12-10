const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');
const appPath = path.resolve(__dirname, '../src');

const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(__dirname, '../node_modules')];

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.html$/,
            loader: 'html'

        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'null'
        }, {
            test: cssTest(cssConfig.language),
            include: publicPaths,
            loader: 'null'
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            loader: `to-string!css${cssConfig.language ? '!' + cssConfig.language : ''}`
        }]
    }
};
