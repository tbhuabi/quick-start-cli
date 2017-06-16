const open = require('open');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require("connect-history-api-fallback");

const express = require('express');

const webpackConfig = require('../config/webpack.dev');
const globalConfig = require('../global.config');

const compiler = webpack(webpackConfig);

const app = express();


app.use(historyApiFallback({
    index: globalConfig.localPath
}));

app.use(webpackDevMiddleware(compiler, {
    publicPath: globalConfig.localPath,
    stats: {
        colors: true,
        chunks: false
    }
}));
app.use(webpackHotMiddleware(compiler));


app.listen(globalConfig.port, globalConfig.ip, error => {
    if (error) {
        console.log(error);
        return;
    }
    open(globalConfig.localPath);
});