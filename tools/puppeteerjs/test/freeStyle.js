const Page = require('../src/page');
const cases = require('../src/cases');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe(`Free Style Module Demo`, function() {
    // disable timeouts
    this.timeout(0);

    let page;
    let p;

    before(async function() {
        page = new Page();
        await page.setup({ headless: false });
        p = page.page;
    });

    after(async function() {
        await page.close();
    });

    it(`free style testcase demo`, async function () {
        await p.goto(`https://alpha.forticloud.com`)
        await p.waitFor(`input#email`)
        await p.type(`input#email`, `zqqiang@fortinet.com`)
        await p.type(`input[name="password"]`, `SuperCRM801`)
        await p.click(`input[type="submit"]`)

        // do everything you want
    });
})