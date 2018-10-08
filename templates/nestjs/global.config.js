const ip = require('ip');
const path = require('path');
const localIp = ip.address();
const devClientPort = 8080;
const devServerPort = 8081;
const prodPort = 44343;
const buildPath = path.resolve(__dirname, 'build/views');
const clientPath = path.resolve(__dirname, 'views');
const devClientDomain = 'http://' + localIp + ':' + devClientPort + '/';
const devServerDomain = 'http://' + localIp + ':' + devServerPort + '/';
const prodDomain = 'http://' + localIp + ':' + prodPort + '/';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  ip: localIp,
  devClientPort,
  devServerPort,
  prodPort,
  devClientDomain,
  devServerDomain,
  prodDomain,
  buildPath,
  staticPublicPath: 'static/',
  onlinePublishPathPrefix: isProduction ? '/open-platform/' : '',
  clientPath,
  isProduction
};
