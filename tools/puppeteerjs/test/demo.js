const Page = require('../src/page');
const cases = require('../src/cases');
const assert = require('assert');
const fs = require('fs');

require('../it/addresses');

describe("Demo suite", function() {
    this.timeout(0);

    let page;

    before(async function() {
        page = new Page();
        await page.setup();
    });

    after(async function() {
        await page.close();
    });

    for (const testcase of cases) {
        it(testcase.name, async function() {
            // await page.run(testcase);
        });
    }
});