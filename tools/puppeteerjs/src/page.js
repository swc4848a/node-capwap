const puppeteer = require('puppeteer');
const path = require('path');

class Page {
    constructor() {
        this.browser = undefined;
        this.page = undefined;
    }
    async setup() {
        const width = 1600
        const height = 900

        this.browser = await puppeteer.launch({
            headless: true,
            // slowMo: 250,
            args: [
                `--window-size=${width},${height}`
            ]
        });

        this.page = await this.browser.newPage();
        this.page.on('console', msg => console.log('  page log:', msg.text()));

        this.page.setViewport({
            width: width,
            height: height,
        });
    }
    async close() {
        await this.page.screenshot({ path: path.join(__dirname, '../img/result.png') });
        await this.browser.close();
    }
    async run(testcase) {
        for (const item of testcase.seq) {
            switch (item.action) {
                case `screenshot`:
                    await this.page.screenshot({ path: path.join(__dirname, `/img/${item.filename}`) });
                    break
                case `evaluate`:
                    await this.page.evaluate(`${item.script}`)
                    break
                case `goto`:
                    await this.page.goto(item.url)
                    break
                case `type`:
                    if (item.sel.includes(`:`)) {
                        await this.page.evaluate(`$("${item.sel}").val("${item.val}")`)
                    } else {
                        await this.page.waitFor(item.sel, { timeout: 10000 })
                        await this.page.type(item.sel, item.val)
                    }
                    break
                case `click`:
                    if (item.sel.startsWith(`//`)) {
                        const elem = await this.page.waitFor(item.sel, { timeout: 10000 })
                        await elem.click()
                    } else if (item.sel.includes(`:`)) {
                        await this.page.evaluate(`$("${item.sel}").click()`)
                    } else {
                        await this.page.click(item.sel)
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
                    frame = page.frames().find(frame => frame.name().includes('embedded-iframe'));
                    if (frame) {
                        result = await frame.$eval(`${item.sel}`, el => el.value)
                    } else {
                        result = await this.page.$eval(`${item.sel}`, el => el.value)
                    }
                    console.log(`  result: [${result}] expect: [${item.expect}] => ${result == item.expect ? 'success' : 'failed'}`)
                    break
                case `isCheck`:
                    frame = page.frames().find(frame => frame.name().includes('embedded-iframe'));
                    if (frame) {
                        result = await frame.evaluate(`$('${item.sel}').prop("checked")`)
                    } else {
                        result = await this.page.evaluate(`$('${item.sel}').prop("checked")`)
                    }
                    console.log(`  result: [${result}] expect: [${item.expect}] => ${result === item.expect ? 'success' : 'failed'}`)
                    break
                case `isDelete`:
                    result = await this.page.evaluate(`$('div.first-cell span:contains("${item.target}")').length`);
                    console.log(`  result: [${result}] expect: [${0}] => ${result === 0 ? 'success' : 'failed'}`)
                    break
                case `has`:
                    result = await this.page.evaluate(`$(':contains("${item.target}")').length`);
                    console.log(`  result: [${result}] expect: [${1}] => ${result !== 0 ? 'success' : 'failed'}`)
                    break
                default:
                    console.error(`  unsupport action: ${action}`)
            }
        }
    }
};

module.exports = Page;