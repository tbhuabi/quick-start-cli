const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');

const appPath = path.resolve(__dirname, '../src');

const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(__dirname, '../node_modules')];

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: appPath,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                    compact: false
                }
            }]
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'url-loader'
        }, {
            test: cssTest(cssConfig.language),
            include: publicPaths,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            use: ['style-lader', 'css-loader?modules&localIdentName=[name]__[local]', cssConfig.language + '-loader']
        }]
    }
};
