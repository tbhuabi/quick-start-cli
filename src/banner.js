const chalk = require('chalk');
const figlet = require('figlet');
const log = require('./logger');

module.exports = function banner() {
  log(chalk.green(figlet.textSync('QS---TanBo', {
    horizontalLayout: 'full'
  })));
}