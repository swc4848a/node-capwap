const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const cases = require('./src/cases');
const commander = require('./src/commander');
commander.show();

(async() => {
    const files = fs.readdirSync('./it');

    for (const file of files) {
        require(`./it/${file}`);
        console.log(`  load ${file}`);
    };
})();

async function run(page, testcase) {
    for (const item of testcase.seq) {
        switch (item.action) {
            case `screenshot`:
                await page.screenshot({ path: path.join(__dirname, `/img/${item.filename}`) });
                break
            case `evaluate`:
                await page.evaluate(`${item.script}`)
                break
            case `goto`:
                await page.goto(item.url)
                break
            case `type`:
                if (item.sel.includes(`:`)) {
                    await page.evaluate(`$("${item.sel}").val("${item.val}")`)
                } else {
                    await page.waitFor(item.sel, { timeout: 10000 })
                    await page.type(item.sel, item.val)
                }
                break
            case `click`:
                if (item.sel.startsWith(`//`)) {
                    const elem = await page.waitFor(item.sel, { timeout: 10000 })
                    await elem.click()
                } else if (item.sel.includes(`:`)) {
                    await page.evaluate(`$("${item.sel}").click()`)
                } else {
                    await page.click(item.sel)
                }
                break
            case `wait`:
                await page.waitFor(item.timeout)
                break
            case `waitFor`:
                await page.waitFor(item.sel, { timeout: item.timeout })
                break
            case `check`:
                await page.evaluate(`$("${item.sel}").prop("checked", ${item.val})`)
                break
            case `isType`:
                frame = page.frames().find(frame => frame.name().includes('embedded-iframe'));
                if (frame) {
                    result = await frame.$eval(`${item.sel}`, el => el.value)
                } else {
                    result = await page.$eval(`${item.sel}`, el => el.value)
                }
                console.log(`  result: [${result}] expect: [${item.expect}] => ${result == item.expect ? 'success' : 'failed'}`)
                break
            case `isCheck`:
                frame = page.frames().find(frame => frame.name().includes('embedded-iframe'));
                if (frame) {
                    result = await frame.evaluate(`$('${item.sel}').prop("checked")`)
                } else {
                    result = await page.evaluate(`$('${item.sel}').prop("checked")`)
                }
                console.log(`  result: [${result}] expect: [${item.expect}] => ${result === item.expect ? 'success' : 'failed'}`)
                break
            case `isDelete`:
                result = await page.evaluate(`$('div.first-cell span:contains("${item.target}")').length`);
                console.log(`  result: [${result}] expect: [${0}] => ${result === 0 ? 'success' : 'failed'}`)
                break
            case `has`:
                result = await page.evaluate(`$(':contains("${item.target}")').length`);
                console.log(`  result: [${result}] expect: [${1}] => ${result !== 0 ? 'success' : 'failed'}`)
                break
            default:
                console.error(`  unsupport action: ${action}`)
        }
    }
};

(async() => {
    const width = 1600
    const height = 900

    const browser = await puppeteer.launch({
        headless: commander.headless(),
        // slowMo: 250,
        args: [
            `--window-size=${width},${height}`
        ]
    });

    const page = await browser.newPage();
    page.on('console', msg => console.log('  page log:', msg.text()));

    page.setViewport({
        width: width,
        height: height,
    });

    try {
        for (const testcase of cases) {
            if (commander.case() && !commander.case().includes(testcase.name)) {
                console.log(`  skip ${testcase.name}`)
                continue
            }
            console.log(`  run testcase: ${testcase.name}`)
            await run(page, testcase)
        }
    } catch (error) {
        console.error(`  catch: `, error)
    }

    await page.screenshot({ path: path.join(__dirname, '/img/result.png') });
    await browser.close();
})();