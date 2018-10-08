const globalConfig = require('./global.config');

module.exports = globalConfig.isProduction ? {
  api: 'http://172.16.150.69:8409',
  name: '本地'
} : {
  api: 'http://47.96.24.223:8409',
  name: '联调'
};