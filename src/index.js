const chalk = require('chalk');
const clear = require('clear');
const inquirer = require('inquirer');


const banner = require('./banner');
const line = require('./line');
const log = require('./logger');
const create = require('./create');
clear();
line();
banner();
line();

const questions1 = [{
  name: 'projectName',
  type: 'input',
  message: '请输入项目名称：',
  validate(value) {
    return value.length ? true : '请输入正确项目名称'
  }
}, {
  name: 'projectType',
  type: 'rawlist',
  choices: ['Angular', 'React', 'Vue'],
  message: '请选择项目框架：'
}];

const questions2 = [{
  name: 'cssLanguage',
  type: 'rawlist',
  choices: ['sass', 'less', 'stylus'],
  message: '请选择样式表语言：'
}, {
  name: 'version',
  type: 'input',
  message: '请输入版本号(可选)：',
  validate(value) {
    return /^\d+\.\d+\.\d+$/.test(value) || !value ? true : '请输入正确的版本号，如：1.0.0'
  }
}, {
  name: 'author',
  type: 'input',
  message: '请输入作者的名称(可选)：'
}, {
  name: 'description',
  type: 'input',
  message: '请输入项目简介(可选)：'
}];
module.exports = function buildProject() {
  log(chalk.blue('创建项目：'));
  inquirer.prompt(questions1).then(answers => {
    if (answers.projectType === 'React') {
      return inquirer.prompt([{
        name: 'language',
        type: 'rawlist',
        choices: ['Javascript', 'Typescript'],
        message: '请选择开发语言：'
      }]).then(result => {
        answers.language = result.language;
        return answers;
      });
    }

    return answers;
  }).then(answers => {
    return inquirer.prompt(questions2).then(result => {
      for (let key in result) {
        if (result.hasOwnProperty(key)) {
          answers[key] = result[key];
        }
      }
      return answers;
    })
  }).then(answers => {
    line();
    let messages = [
      `    项目名称：${chalk.green(answers.projectName)}`,
      `    项目框架：${chalk.green(answers.projectType)}`,
      `  样式表语言：${chalk.green(answers.cssLanguage)}`,
      `      版本号：${chalk.green(answers.version)}`,
      `        作者：${chalk.green(answers.author)}`,
      `    项目简介：${chalk.green(answers.description)}`
    ];
    if (answers.projectType === 'React') {
      messages.splice(2, 0, `    开发语言：${chalk.green(answers.language)}`);
    }

    log(messages.join('\n'));
    inquirer.prompt([{
      name: 'confirm',
      type: 'confirm',
      message: '请确认您的项目：'
    }]).then(result => {
      if (result.confirm) {
        create(answers);
      } else {
        log(chalk.red('项目创建取消成功！'));
      }
    })
  });
};
