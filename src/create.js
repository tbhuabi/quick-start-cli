const copy = require('directory-copy');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const line = require('./line');
const log = require('./logger');
const cssConfig = require('./css-config.json');

module.exports = function (config) {
    line();
    log(chalk.green('正在创建项目……'));

    const templateSource = path.resolve(__dirname, `../templates/${config.projectType.toLowerCase()}/template`);
    const templateTarget = config.projectName;

    copy({
        src: templateSource,
        dest: templateTarget
    }, () => {
        log('--项目模板创建完成--');
    }).on('log', message => {
        log(chalk.gray('**') + ' ' + message);
    });

    const demoSource = path.resolve(__dirname, `../templates/${config.projectType}/demo/${config.cssLanguage}`);
    const demoTarget = path.join(config.projectName, 'src');
    copy({
        src: demoSource,
        dest: demoTarget
    }, () => {
        const fileName = path.join(config.projectName, 'config/css-config.json');
        const fileContent = JSON.stringify({
            language: config.cssLanguage
        }, null, 2);
        fs.writeFile(fileName, fileContent, error => {
            if (error) {
                log(chalk.red(error))
            }
        });

        let packageJson = require(`../templates/${config.projectType}/template/package.json`);
        let cssLoaderConfig = cssConfig[config.cssLanguage];

        packageJson.name = config.projectName;
        if (config.version) {
            packageJson.version = config.version;
        }
        if (config.author) {
            packageJson.author = config.author;
        }
        if (config.description) {
            packageJson.description = config.description;
        }


        for (let key in cssLoaderConfig) {
            if (cssLoaderConfig.hasOwnProperty(key)) {
                packageJson.devDependencies[key] = cssLoaderConfig[key];
            }
        }
        let packageFile = path.join(config.projectName, 'package.json');
        let packageContent = JSON.stringify(packageJson, null, 2);
        fs.writeFile(packageFile, packageContent, error => {
            if (error) {
                log(chalk.red(error))
            }
        });
        log('--项目配置创建完成--');
        log(chalk.green('项目创建完成！'));
    }).on('log', message => {
        log(chalk.gray('**') + ' ' + message);
    });
};