const puppeteer = require('puppeteer');
const path = require('path');
const assert = require('chai').assert;
const chalk = require('chalk');
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
            ignoreHTTPSErrors: true,
            args: [
                `--window-size=${width},${height}`
            ]
        }

        if (process.platform === `win32`) {

        } else if (process.platform === `linux`) {
            launchOptions.executablePath = `/usr/bin/google-chrome`
            launchOptions.args.push(`--no-sandbox`)
        } else {
            console.error(`${chalk.red('unsupport')} os ${process.platform}`);
        }

        this.browser = await puppeteer.launch(launchOptions);

        this.page = await this.browser.newPage();
        this.page.on('console', msg => {
            const message = msg.text()
            if (!(message.includes(`Google Maps API warning`) ||
                    message.includes(`WANIPBlacklist`))) {
                console.log(`  ${chalk.blue('page log:')}`, message)
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
                console.log(`  ${chalk.blue('screenshot')} ./out/${item.filename}`)
                await this.page.screenshot({ path: path.join(__dirname, `../out/${item.filename}`) })
                break
            case `evaluate`:
                console.log(`  ${chalk.blue('evaluate')} ${item.script}`)
                await this.page.evaluate(`${item.script}`)
                break
            case `goto`:
                console.log(`  ${chalk.blue('goto')} ${item.url}`)
                await this.page.goto(item.url)
                break
            case `set`:
                console.log(`  ${chalk.blue('set')} ${item.sel} '${item.val}'`)
                await this.page.evaluate(`$("${item.sel}").val("${item.val}")`)
                break
            case `type`:
                console.log(`  ${chalk.blue('type')} ${item.sel} '${item.val}'`)
                await this.page.waitFor(item.sel, { timeout: 10000 })
                await this.page.type(item.sel, item.val)
                break
            case `click`:
                console.log(`  ${chalk.blue('click')} ${item.sel}`)
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
                    await gui.waitFor(item.sel)
                    await gui.click(item.sel)
                }
                break
            case `condClick`:
                await this.page.waitFor(2000) 
                if (item.cond == `ifExist`) {
                    if(await this.page.evaluate(`$('${item.sel}').length`)){
                        await this.page.evaluate(`$('${item.sel}').click()`)
                    }
                } else {
                    console.error(`  ${chalk.red('unknown condition')} ${item.cond} for ${item.sel}`)
                }
                break
            case `wait`:
                console.log(`  ${chalk.blue('wait')} ${item.timeout}ms`)
                await this.page.waitFor(item.timeout)
                break
            case `waitFor`:
                console.log(`  ${chalk.blue('waitFor')} ${item.sel} timeout ${item.timeout}`)
                await this.page.waitFor(item.sel, { timeout: item.timeout })
                break
            case `check`:
                console.log(`  ${chalk.blue('check')} ${item.sel} '${item.val}'`)
                await this.page.evaluate(`$("${item.sel}").prop("checked", ${item.val})`)
                break
            case `isType`:
                frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                if (frame) {
                    result = await frame.$eval(`${item.sel}`, el => el.value)
                } else {
                    result = await this.page.$eval(`${item.sel}`, el => el.value)
                }
                console.log(`  ${chalk.blue('result:')} [${result}] expect: [${item.expect}] => ${result == item.expect ? chalk.green('success') : chalk.red('failed')}`)
                assert.equal(result, item.expect, `${item.sel} should be ${item.expect}`)
                break
            case `isCheck`:
                frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                if (frame) {
                    result = await frame.evaluate(`$('${item.sel}').prop("checked")`)
                } else {
                    result = await this.page.evaluate(`$('${item.sel}').prop("checked")`)
                }
                console.log(`  ${chalk.blue('result:')} [${result}] expect: [${item.expect}] => ${result === item.expect ? chalk.green('success') : chalk.red('failed')}`)
                assert.equal(result, item.expect, `${item.sel} should be ${item.expect}`)
                break
            case `isDelete`:
                await this.page.waitFor(`div.table-container, div.content`);
                frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                if (frame) {
                    result = await frame.evaluate(`$(':contains("${item.target}")').length`);
                    if (0 === result) {
                        result = await frame.evaluate(`$('tr[mkey="${item.target}"]').length`);
                    }
                } else {
                    result = await this.page.evaluate(`$(':contains("${item.target}")').length`);
                    if (0 === result) {
                        result = await this.page.evaluate(`$('tr[mkey="${item.target}"]').length`);
                    }
                }
                console.log(`  ${chalk.blue('result:')} [${result}] expect: [${0}] => ${result === 0 ? chalk.green('success') : chalk.red('failed')}`)
                assert.equal(result, 0, `${item.sel} should be ${0}`)
                break
            case `has`:
                frame = this.page.frames().find(frame => frame.name().includes('embedded-iframe'));
                if (frame) {
                    result = await frame.evaluate(`$(':contains("${item.target}")').length`);
                } else {
                    result = await this.page.evaluate(`$(':contains("${item.target}")').length`);
                }
                console.log(`  ${chalk.blue('result:')} [${result}] expect: [${1}] => ${result !== 0 ? chalk.green('success') : chalk.red('failed')}`)
                assert(result !== 0, `${item.sel} should not eq 0`)
                break
            default:
                console.error(`  ${chalk.red('unsupport action:')} ${action}`)
        }
    }
    async run(testcase) {
        for (const item of testcase.seq) {
            try {
                await this.action(item)
            } catch (error) {
                console.error(`  ${chalk.red('catch:')} ${item.sel} `, error)
                if (error.message.includes(`waiting failed`) ||
                    error.message.includes(`disabled failed`)) {
                    assert(false, `${item.sel}: ${error.message}`)
                    return
                }
                assert(false, `${item.sel}: ${error.message}`)
                // this.page.capture(``)
            }
        }
    }
};

module.exports = Page;