const ip = require('ip');
const path = require('path');
const localIp = ip.address();
const port = '8080';
const buildPath = path.resolve(__dirname, 'dist');
const appPath = path.resolve(__dirname, 'src');
const domain = 'http://' + localIp + ':' + port + '/';

module.exports = {
    ip: localIp,
    port,
    domain,
    buildPath,
    staticPublicPath: 'static/',
    onlinePublishPathPrefix: '/',
    appPath
};
