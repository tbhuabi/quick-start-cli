const ip = require('ip');
const isDoc = process.env.NODE_ENV === 'documentation';
const path = require('path');
const localIp = ip.address();
const port = isDoc ? '8080' : '8081';
const buildPath = path.resolve(__dirname, isDoc ? 'doc-build' : 'dist');
const appPath = path.resolve(__dirname, isDoc ? 'docs' : 'src');
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
