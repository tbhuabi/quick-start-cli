#!/usr/bin/env node

/**
 * Module dependencies.
 */
const program = require('commander');

const packageJson = require('../package.json');
const index = require('../src/index');

program
    .version(packageJson.version)
    .option('-v, --version', packageJson.version)
    .option('-c, --create', 'through quick-start-cli create A project', () => {
        index()
    })
    .parse(process.argv);