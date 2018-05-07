const globalConfig = require('../global.config');
const context = require.context(globalConfig.appPath, true, /\.test\.jsx?$/);
context.keys().forEach(context);