const puppeteer = require('puppeteer');
const path = require('path');
const assert = require('chai').assert;

class Page {
    constructor() {
        this.browser = undefined;
        this.page = undefined;
    }
    async setup(options) {
        const width = 1600
        const height = 900

        let launchOptions = {
            headless: options.headless,
            args: [
                `--window-size=${width},${height}`
            ]
        }

        if (process.platform === `win32`) {

        } else if (process.platform === `linux`) {
            launchOptions.executablePath = `/usr/bin/google-chrome`
            launchOptions.args.push(`--no-sandbox`)
        } else {
            console.error(`unsupport os ${process.platform}`);
        }

        this.browser = await puppeteer.launch(launchOptions);

        this.page = await this.browser.newPage();
        this.page.on('console', msg => console.log('  page log:', msg.text()));

        this.page.setViewport({
            width: width,
            height: height,
        });
    }
    async close() {
        await this.page.screenshot({ path: path.join(__dirname, '../out/result.png') });
        await this.browser.close();
    }
    async run(testcase) {
        for (const item of testcase.seq) {
            let frame = undefined;
            let result = undefined;
            switch (item.action) {
                case `screenshot`:
                    await this.page.screenshot({ path: path.join(__dirname, `../out/${item.filename}`) });
                    break
                case `evaluate`:
                    await this.page.evaluate(`${item.script}`)
                    break
                case `goto`:
                    await this.page.goto(item.url)
                    break
                case `set`:
                    await this.page.evaluate(`$("${item.sel}").val("${item.val}")`)
                    break
                case `type`:
                    await this.page.waitFor(item.sel, { timeout: 10000 })
                    await this.page.type(item.sel, item.val)
                    break
                case `click`:
                    frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                    const gui = frame ? frame : this.page;
                    if (item.sel.startsWith(`//`)) {
                        const elem = await gui.waitFor(item.sel, { timeout: 10000 })
                        await elem.click()
                    } else if (item.sel.includes(`:`)) {
                        await gui.evaluate(`$("${item.sel}").click()`)
                    } else {
                        await gui.click(item.sel)
                    }
                    break
                case `wait`:
                    await this.page.waitFor(item.timeout)
                    break
                case `waitFor`:
                    await this.page.waitFor(item.sel, { timeout: item.timeout })
                    break
                case `check`:
                    await this.page.evaluate(`$("${item.sel}").prop("checked", ${item.val})`)
                    break
                case `isType`:
                    frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                    if (frame) {
                        result = await frame.$eval(`${item.sel}`, el => el.value)
                    } else {
                        result = await this.page.$eval(`${item.sel}`, el => el.value)
                    }
                    console.log(`  result: [${result}] expect: [${item.expect}] => ${result == item.expect ? 'success' : 'failed'}`)
                    assert.equal(result, item.expect, `${item.sel} should be ${item.expect}`)
                    break
                case `isCheck`:
                    frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                    if (frame) {
                        result = await frame.evaluate(`$('${item.sel}').prop("checked")`)
                    } else {
                        result = await this.page.evaluate(`$('${item.sel}').prop("checked")`)
                    }
                    console.log(`  result: [${result}] expect: [${item.expect}] => ${result === item.expect ? 'success' : 'failed'}`)
                    assert.equal(result, item.expect, `${item.sel} should be ${item.expect}`)
                    break
                case `isDelete`:
                    result = await this.page.evaluate(`$('div.first-cell span:contains("${item.target}")').length`);
                    console.log(`  result: [${result}] expect: [${0}] => ${result === 0 ? 'success' : 'failed'}`)
                    assert.equal(result, 0, `${item.sel} should be ${0}`)
                    break
                case `has`:
                    result = await this.page.evaluate(`$(':contains("${item.target}")').length`);
                    console.log(`  result: [${result}] expect: [${1}] => ${result !== 0 ? 'success' : 'failed'}`)
                    assert.equal(result, 1, `${item.sel} should be ${1}`)
                    break
                default:
                    console.error(`  unsupport action: ${action}`)
            }
        }
    }
};

module.exports = Page;