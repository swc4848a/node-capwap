const Page = require('../src/page');
const cases = require('../src/cases');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe(`Free Style Module Demo`, function() {
    // disable timeouts
    this.timeout(0);
    let page;

    before(async function() {
        this.page = new Page();
        await this.page.setup({ headless: false });
        page = this.page.instance();
    });

    after(async function() {
        await this.page.close();
    });

    beforeEach(async function() {
        await page.goto(`https://alpha.forticloud.com`)
        await page.waitFor(`input#email`)
        await page.type(`input#email`, `zqqiang@fortinet.com`)
        await page.type(`input[name="password"]`, `SuperCRM801`)
        await page.click(`input[type="submit"]`)
    });

    afterEach(async function() {
        
    });

    // .\node_modules\.bin\mocha.cmd --grep "free style testcase demo"
    it(`free style testcase demo`, async function () {
        // do everything you want
        assert.equal(true, true, `should be the same`)
    });
});