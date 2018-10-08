const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require("connect-history-api-fallback");

const express = require('express');

const webpackConfig = require('./webpack.dev');
const globalConfig = require('../global.config');

const compiler = webpack(webpackConfig);

const app = express();

app.use('/', function (req, res, next) {
  console.log('接收到请求：' + req.url);
  next();
});

app.use(historyApiFallback({
  index: globalConfig.devClientDomain
}));

app.use(webpackDevMiddleware(compiler, {
  publicPath: globalConfig.devClientDomain,
  stats: {
    colors: true,
    chunks: false
  }
}));
app.use(webpackHotMiddleware(compiler));


app.listen(globalConfig.devClientPort, globalConfig.ip, error => {
  if (error) {
    console.log(error);
  }
});