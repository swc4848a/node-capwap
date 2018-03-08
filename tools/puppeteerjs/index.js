const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const Page = require('./src/page');
const cases = require('./src/cases');
const commander = require('./src/commander');
commander.show();

(async() => {
    const files = fs.readdirSync('./it');

    for (const file of files) {
        if (file.includes(`.svn`)) continue;
        require(`./it/${file}`);
        // console.log(`  load ${file}`);
    };
})();

(async() => {
    let page = new Page();
    await page.setup({ headless: commander.headless() });
    if (!(commander.skip() && commander.skip().includes(`testcase`))) {
        await page.goto();
        await page.login();
    }

    for (const testcase of cases) {
        if (commander.case() && !commander.case().includes(testcase.name)) {
            // console.log(`  skip ${testcase.name}`)
            continue
        }
        console.log(`  ==> run testcase: ${testcase.name}`)
        await page.goto()
        await page.run(testcase)
    }

    await page.close();
})();