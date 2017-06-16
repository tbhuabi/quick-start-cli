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

const questions = [{
    name: 'projectName',
    type: 'input',
    message: '请输入项目名称：',
    validate(value) {
        return value.length ? true : '请输入正确项目名称'
    }
}, {
    name: 'projectType',
    type: 'rawlist',
    choices: ['angular', 'React', 'vue'],
    message: '请选择项目框架：'
}, {
    name: 'cssLanguage',
    type: 'rawlist',
    choices: ['sass', 'less', 'stylus'],
    message: '请选择样式表语言：'
}, {
    name: 'version',
    type: 'input',
    message: '请输入版本号：',
    validate(value) {
        return /^\d+\.\d+\.\d+$/.test(value) || !value ? true : '请输入正确的版本号，如：1.0.0'
    }
}, {
    name: 'author',
    type: 'input',
    message: '请输入作者的名称：'
}, {
    name: 'description',
    type: 'input',
    message: '请输入项目简介：'
}];
module.exports = function buildProject() {
    log(chalk.blue('创建项目：'));
    inquirer.prompt(questions).then(answers => {
        return new Promise(resolve => {
            line();
            let messages = [
                `    项目名称：${chalk.green(answers.projectName)}`,
                `    项目框架：${chalk.green(answers.projectType)}`,
                `  样式表语言：${chalk.green(answers.cssLanguage)}`,
                `      版本号：${chalk.green(answers.version)}`,
                `        作者：${chalk.green(answers.author)}`,
                `    项目简介：${chalk.green(answers.description)}`
            ];
            log(messages.join('\n'));
            inquirer.prompt([{
                name: 'confirm',
                type: 'confirm',
                message: '请确认您的项目：'
            }]).then(result => {
                if (result.confirm) {
                    resolve(answers)
                } else{
                    log(chalk.red('项目创建取消成功！'))
                }
            })
        })
    }).then(result => {
        create(result);
    });
};
