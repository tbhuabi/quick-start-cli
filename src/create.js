const copy = require('directory-copy');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const line = require('./line');
const log = require('./logger');
const cssConfig = require('./css-config.json');

module.exports = function (result) {
    line();
    log(chalk.green('正在创建项目……'));

    const templateSource = path.resolve(__dirname, `../templates/${result.projectType}/template`);
    const templateTarget = result.projectName;

    copy({
        src: templateSource,
        dest: templateTarget
    }, () => {
        log('--项目模板创建完成--');
    }).on('log', message => {
        log(chalk.gray('**') + ' ' + message);
    });

    const demoSource = path.resolve(__dirname, `../templates/${result.projectType}/demo/${result.cssLanguage}`);
    const demoTarget = path.join(result.projectName, 'src');
    copy({
        src: demoSource,
        dest: demoTarget
    }, () => {
        const fileName = path.join(result.projectName, 'config/css-config.json');
        const fileContent = JSON.stringify({
            language: result.cssLanguage
        }, null, 2);
        fs.writeFile(fileName, fileContent, error => {
            if (error) {
                log(chalk.red(error))
            }
        });

        let packageJson = require(`../templates/${result.projectType}/template/package.json`);
        let cssLoaderConfig = cssConfig[result.cssLanguage];

        packageJson.name = result.projectName;
        if (result.version) {
            packageJson.version = result.version;
        }
        if (result.description) {
            packageJson.description = result.description;
        }


        for (let key in cssLoaderConfig) {
            if (cssLoaderConfig.hasOwnProperty(key)) {
                packageJson.devDependencies[key] = cssLoaderConfig[key];
            }
        }
        let packageFile = path.join(result.projectName, 'package.json');
        let packageContent = JSON.stringify(packageJson, null, 2);
        fs.writeFile(packageFile, packageContent, error => {
            if (error) {
                log(chalk.red(error))
            }
        })
        log('--项目配置创建完成--');
        log(chalk.green('项目创建完成！'));
    }).on('log', message => {
        log(chalk.gray('**') + ' ' + message);
    });
};