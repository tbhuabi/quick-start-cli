const open = require('open');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require("connect-history-api-fallback");
const httpProxyMiddleware = require('http-proxy-middleware');

const express = require('express');

const webpackConfig = require('../config/webpack.dev');
const globalConfig = require('../global.config');
const proxyConfig = require('../proxy.config');

const compiler = webpack(webpackConfig);

const app = express();


app.use('/api', httpProxyMiddleware({
    target: proxyConfig.api[0],
    pathRewrite: {
        '^/api/': '/'
    },
    onProxyReq(proxyRequest, request, response) {
        console.log(`请求：${request.url}，代理到${proxyConfig.api[1]}：${proxyConfig.api[0]}${proxyRequest.path}`)
    }
}));

app.use(historyApiFallback({
    index: globalConfig.domain
}));

app.use(webpackDevMiddleware(compiler, {
    publicPath: globalConfig.domain,
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
    open(globalConfig.domain);
});