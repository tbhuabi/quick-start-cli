const log = require('./logger');

let line = [];
for (let i = 0; i < 80; i++) {
  line.push('=')
}
line = line.join('');
module.exports = function () {
  log(line)
};