const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');
const appPath = path.resolve(__dirname, '../src');

const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(__dirname, '../node_modules')];

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader']

        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            use: ['null-loader']
        }, {
            test: cssTest(cssConfig.language),
            include: publicPaths,
            use: ['null-loader']
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            use: ['to-string-loader', 'css-loader'].concat(`${cssConfig.language ? cssConfig.language + '-loader?sourceMap' : ''}`)
        }]
    }
};
