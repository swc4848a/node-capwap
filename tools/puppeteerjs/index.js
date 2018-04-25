const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const Page = require('./src/page');
const cases = require('./src/cases');
const config = require('./conf/config');
const commander = require('./src/commander');
commander.show();

(async() => {
    const it = fs.readdirSync('./it');

    for (const module of it) {
        if (module.includes(`.svn`)) continue;
        const files = fs.readdirSync(`./it/${module}/`);
        for (const file of files) {
            if (file.includes(`.svn`)) continue;
            require(`./it/${module}/${file}`);
            // console.log(`  load ${module}/${file}`);
        }
    };
})();

(async() => {
    let page = new Page();
    await page.setup({ headless: commander.headless() });
    if (!(commander.skip() && commander.skip().includes(`testcase`))) {
        await page.goto(config.cloudUrl);
        await page.login();
    }

    for (const testcase of cases.cfg) {
        if (commander.case() && !commander.case().includes(testcase.name)) {
            // console.log(`  skip ${testcase.name}`)
            continue
        }
        console.log(chalk`  {blue ==>} run testcase: {blue ${testcase.name}}`)
        await page.goto(config.cloudUrl)
        await page.run(testcase)
    }

    for (const testcase of cases.report) {
        if (commander.case() && !commander.case().includes(testcase.name)) {
            // console.log(`  skip ${testcase.name}`)
            continue
        }
        console.log(chalk`  {blue ==>} run testcase: {blue ${testcase.name}}`)
        await page.goto(config.cloudUrl)
        await page.run(testcase)
    }

    await page.close();
})();