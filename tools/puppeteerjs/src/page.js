const puppeteer = require('puppeteer');
const path = require('path');
const assert = require('chai').assert;
const Config = require('../conf/config')

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
        this.page.on('console', msg => {
            const message = msg.text()
            if (!(message.includes(`Google Maps API warning`) ||
                    message.includes(`WANIPBlacklist`))) {
                console.log('  page log:', message)
            }
        });

        this.page.setViewport({
            width: width,
            height: height,
        });
    }
    async goto() {
        await this.page.goto(Config.cloudUrl)
    }
    async login() {
        await this.page.waitFor(3000)
        await this.page.type(`input#email`, Config.cloudUsername)
        await this.page.type(`input[name="password"]`, Config.cloudPassword)
        await this.page.click(`input[type="submit"]`)
        await this.page.waitFor(3000)
    }
    async close() {
        await this.page.screenshot({ path: path.join(__dirname, '../out/result.png') });
        await this.browser.close();
    }
    async action(item) {
        let frame = undefined;
        let result = undefined;
        switch (item.action) {
            case `screenshot`:
                console.log(`  screenshot ./out/${item.filename}`)
                await this.page.screenshot({ path: path.join(__dirname, `../out/${item.filename}`) })
                break
            case `evaluate`:
                console.log(`  evaluate ${item.script}`)
                await this.page.evaluate(`${item.script}`)
                break
            case `goto`:
                console.log(`  goto ${item.url}`)
                await this.page.goto(item.url)
                break
            case `set`:
                console.log(`  set ${item.sel} '${item.val}'`)
                await this.page.evaluate(`$("${item.sel}").val("${item.val}")`)
                break
            case `type`:
                console.log(`  type ${item.sel} '${item.val}'`)
                await this.page.waitFor(item.sel, { timeout: 10000 })
                await this.page.type(item.sel, item.val)
                break
            case `click`:
                console.log(`  click ${item.sel}`)
                frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                const gui = frame ? frame : this.page;
                if (item.sel.startsWith(`//`)) {
                    const elem = await gui.waitFor(item.sel, { timeout: 10000 })
                    await elem.click()
                } else if (item.sel.includes(`:`)) {
                    const disabled = await gui.evaluate(`$("${item.sel}").prop("disabled")`)
                    if (disabled) {
                        throw new Error(`disabled failed: editor ${item.sel} disabled`)
                    } else {
                        await gui.evaluate(`$("${item.sel}").click()`)
                    }
                } else {
                    await gui.click(item.sel)
                }
                break
            case `wait`:
                console.log(`  wait ${item.timeout}ms`)
                await this.page.waitFor(item.timeout)
                break
            case `waitFor`:
                console.log(`  waitFor ${item.sel} timeout ${item.timeout}`)
                await this.page.waitFor(item.sel, { timeout: item.timeout })
                break
            case `check`:
                console.log(`  check ${item.sel} '${item.val}'`)
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
                frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                if (frame) {
                    result = await frame.evaluate(`$('div.first-cell span:contains("${item.target}")').length`);
                    if (0 === result) {
                        result = await frame.evaluate(`$('tr[mkey="${item.target}"]').length`);
                    }
                } else {
                    result = await this.page.evaluate(`$('div.first-cell span:contains("${item.target}")').length`);
                    if (0 === result) {
                        result = await this.page.evaluate(`$('tr[mkey="${item.target}"]').length`);
                    }
                }
                console.log(`  result: [${result}] expect: [${0}] => ${result === 0 ? 'success' : 'failed'}`)
                assert.equal(result, 0, `${item.sel} should be ${0}`)
                break
            case `has`:
                frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                if (frame) {
                    result = await frame.evaluate(`$(':contains("${item.target}")').length`);
                } else {
                    result = await this.page.evaluate(`$(':contains("${item.target}")').length`);
                }
                console.log(`  result: [${result}] expect: [${1}] => ${result !== 0 ? 'success' : 'failed'}`)
                assert(result !== 0, `${item.sel} should not eq 0`)
                break
            default:
                console.error(`  unsupport action: ${action}`)
        }
    }
    async run(testcase) {
        for (const item of testcase.seq) {
            try {
                await this.action(item)
            } catch (error) {
                console.error(`  catch: `, error)
                if (error.message.includes(`waiting failed`) ||
                    error.message.includes(`disabled failed`)) {
                    return
                }
                // this.page.capture(``)
            }
        }
    }
};

module.exports = Page;