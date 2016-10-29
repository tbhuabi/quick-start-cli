const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');
const globalConfig = require('../global.config');
const appPath = path.resolve(__dirname, '../src');

const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(__dirname, '../node_modules')];

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.js'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    module: {
        // preLoaders: [{
        //     test: /\.vue$/,
        //     loader: 'eslint',
        //     include: appPath,
        //     exclude: /node_modules/
        // }, {
        //     test: /\.js$/,
        //     loader: 'eslint',
        //     include: appPath,
        //     exclude: /node_modules/
        // }],
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            include: appPath
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: path.posix.join(globalConfig.staticPublicPath, `img/[name].[ext]`)
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: path.posix.join(globalConfig.staticPublicPath, `fonts/[name].[ext]`)
            }
        }, {
            test: cssTest(cssConfig.language),
            include: publicPaths,
            loader: `vue-style!css${cssConfig.language ? '!' + cssConfig.language : ''}`
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            loader: `vue-style!css${cssConfig.language ? '!' + cssConfig.language : ''}`
        }]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    vue: {
        loaders: `vue-style!css${cssConfig.language ? '!' + cssConfig.language : ''}`
    }
};
