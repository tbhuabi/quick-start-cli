const globalConfig = require('../global.config')
const context = require.context(globalConfig.appPath, true, /\.test\.tsx?$/)
context.keys().forEach(context)