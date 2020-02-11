const globalConfig = require('./global.config');

const apiConfig = {
  local: {
    api: 'http://localhost:8409',
    name: '联调地址'
  },
  testing: {
    api: 'http://www.baidu.com',
    name: '测试上线'
  },
  release: {
    api: 'http://www.baidu.com',
    name: '正式上线'
  }
};

module.exports = apiConfig[globalConfig.runtimeENV];
