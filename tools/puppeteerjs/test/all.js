const Page = require('../src/page');
const cases = require('../src/cases');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

(() => {
    const it = fs.readdirSync(path.join(__dirname, '../it'));
    for (const module of it) {
        if (module.includes(`.svn`)) continue;
        const files = fs.readdirSync(path.join(__dirname, `../it/${module}/`));
        for (const file of files) {
            if (file.includes(`.svn`)) continue;
            require(`../it/${module}/${file}`);
            // console.log(`  load ${module}/${file}`);
        }
    };
})();

describe("All Testcases", function() {
    this.timeout(0);

    let page;

    before(async function() {
        page = new Page();
        await page.setup({ headless: true });
        // await page.setup({ headless: false });
        await page.goto();
        await page.login();
    });

    after(async function() {
        await page.close();
    });

    for (const testcase of cases.cfg) {
        it(testcase.name, async function () {
            console.log(`  ==> run testcase: ${testcase.name}`)
            // await page.goto();
            // await page.run(testcase);
        });
    }

    for (const testcase of cases.report) {
        it(testcase.name, async function () {
            console.log(`  ==> run testcase: ${testcase.name}`)
            // await page.goto();
            // await page.run(testcase);
        });
    }
});