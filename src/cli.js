#!/usr/bin/env node
const { mdLinks } = require('../src/mdLinks.js');
const { statsLinks, brokenLinks, help, notExist } = require('../src/cli-stats.js');
const chalk = require('chalk');

// console.log(process.argv);
const options = process.argv.slice(2);
const userPath = process.argv[2]

const validate = options.includes('--validate');
const stats = options.includes('--stats');

if (options.length === 1) {
    mdLinks(userPath, {validate:false})
    .then(res => console.log(res))
    .catch((rej) => {
        if (rej === 'La ruta no existe') {
            console.log(chalk.magentaBright(notExist));
        }
    })
} else {
    if (validate && stats || stats && validate) {
        mdLinks(userPath, {validate:true})
        .then(res => {
            console.table(chalk.greenBright(statsLinks(res)))
            console.table(chalk.redBright(brokenLinks(res)))
        })
    } else if (validate) {
        mdLinks(userPath, {validate:true})
        .then(res => console.log(res))
    } else if (stats) {
        mdLinks(userPath, {validate:true})
        .then(res => console.table(chalk.greenBright(statsLinks(res))))
    } else {
        mdLinks(userPath, {validate:true})
        .then( console.log(chalk.cyanBright(help)))
    }
}
