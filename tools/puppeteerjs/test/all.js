const Page = require('../src/page');
const cases = require('../src/cases');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

(() => {
    const files = fs.readdirSync(path.join(__dirname, '../it'));

    for (const file of files) {
        if (file.includes(`.svn`)) continue;
        require(path.join(__dirname, `../it/${file}`));
        // console.log(`  load ${file}`);
    };
})();

describe("All Testcases", function() {
    this.timeout(0);

    let page;

    before(async function() {
        page = new Page();
        await page.setup({ headless: true });
        await page.goto();
        await page.login();
    });

    after(async function() {
        await page.close();
    });

    for (const testcase of cases) {
        it(testcase.name, async function () {
            console.log(`  ==> run testcase: ${testcase.name}`)
            await page.goto();
            await page.run(testcase);
        });
    }
});