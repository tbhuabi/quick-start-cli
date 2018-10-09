const globalConfig = require('./global.config');

module.exports = globalConfig.isProduction ? {
  api: 'http://localhost:8409',
  name: '本地'
} : {
  api: 'http://www.baidu.com',
  name: '联调'
};