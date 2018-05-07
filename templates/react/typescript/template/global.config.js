const ip = require('ip');
const path = require('path');
const localIp = ip.address();
const port = '8080';
const buildPath = path.resolve(__dirname, 'dist');
const domain = 'http://' + localIp + ':' + port + '/';
const appPath = path.resolve(__dirname, 'src');

/**
 * 当在线发布时，一般会把静态资源发布到cdn，可以通过设置 `ASSETS_PATH` 环境变量，设置cdn地址，如：
 * export ASSETS_PATH=http://www.cdn.com/
 */
let onlinePublishPathPrefix = process.env.ASSETS_PATH;

if (onlinePublishPathPrefix) {
    if (!/\/$/.test(onlinePublishPathPrefix)) {
        onlinePublishPathPrefix = onlinePublishPathPrefix + '/';
    }
} else {
    onlinePublishPathPrefix = '/';
}

module.exports = {
    ip: localIp,
    port,
    domain,
    buildPath,
    staticPublicPath: 'static/',
    onlinePublishPathPrefix,
    appPath
};