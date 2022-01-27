#! /usr/bin/env node

import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import { parseSentence, showHelp, showAll, parseLanguage, usage } from './utils.js'
import chalk from 'chalk'
import boxen from 'boxen'
import Handlebars from "handlebars";
import { promises as fs, existsSync, mkdirSync } from 'fs'
import { URL } from 'url'; // in Browser, the URL in native accessible on window

const __filename = new URL('',
    import.meta.url).pathname;
// Will contain trailing slash
const __dirname = new URL('.',
    import.meta.url).pathname.slice(1);

const controller = await fs.readFile(`${__dirname}/controller.txt`)
const route = await fs.readFile(`${__dirname}/route.txt`)
const service = await fs.readFile(`${__dirname}/service.txt`)
const model = await fs.readFile(`${__dirname}/model.txt`)

const options = yargs()
    .usage(usage)
    .help(true)

const argv = yargs(hideBin(process.argv)).argv

if (!argv._[0]) {
    showHelp();
    process.exit()
}

if (argv._[0]) {
    const templateData = {
        minName: argv._[0].charAt(0).toLowerCase() + argv._[0].slice(1),
        majName: argv._[0].charAt(0).toUpperCase() + argv._[0].slice(1)
    }

    const templateController = Handlebars.compile(controller.toString());
    const templateRoute = Handlebars.compile(route.toString());
    const templateService = Handlebars.compile(service.toString());
    const templateModel = Handlebars.compile(model.toString());

    const folders = ['controllers', 'routes', 'services', 'models']

    folders.forEach(folder => {
        if (!existsSync(folder)) mkdirSync(folder);
    })

    await fs.writeFile(`./controllers/${templateData.minName}.controller.js`, templateController(templateData))
    console.log("\n" + boxen(chalk.yellow("\n" + `./controllers/${templateData.minName}.controller.js file generated` + "\n")) + "\n");
    await fs.writeFile(`./routes/${templateData.minName}.route.js`, templateRoute(templateData))
    console.log("\n" + boxen(chalk.yellow("\n" + `./routes/${templateData.minName}.route.js file generated` + "\n")) + "\n");
    await fs.writeFile(`./services/${templateData.minName}.service.js`, templateService(templateData))
    console.log("\n" + boxen(chalk.yellow("\n" + `./services/${templateData.minName}.service.js file generated` + "\n")) + "\n");
    await fs.writeFile(`./models/${templateData.minName}.model.js`, templateModel(templateData))
    console.log("\n" + boxen(chalk.yellow("\n" + `./models/${templateData.minName}.model.js file generated` + "\n")) + "\n");
}