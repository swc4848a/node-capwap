const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const program = require('commander');
const cases = require('./src/cases');

function list(val) {
    return val.split(',');
}

program
    .version(`0.2.0`)
    .option(`-h, --headless`, `run headless mode`)
    .option(`-s, --skip <items>`, `add the skip steps`, list)
    .parse(process.argv);

console.log('skip ', program.skip);
console.log('headless ', program.headless);

return;

let headless = false;
let filter = undefined;
if (process.argv.length > 2) {
    headless = (process.argv[2] === `headless`);
    filter = process.argv[process.argv.length - 1];
    console.log(`  filter: ${filter}`);
};

(async() => {
    const files = fs.readdirSync('./it');

    for (const file of files) {
        require(`./it/${file}`);
        console.log(`  load ${file}`);
    };
})();

(async() => {
    const width = 1600
    const height = 900

    let frame = undefined
    let result = undefined

    const browser = await puppeteer.launch({
        headless: headless,
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
            if (filter && !testcase.name.includes(filter)) {
                console.log(`  skip ${testcase.name}`)
                continue
            }
            console.log(`  run testcase: ${testcase.name}`)
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
                    default:
                        console.error(`  unsupport action: ${action}`)
                }
            }
        }
    } catch (error) {
        console.error(`  catch: `, error)
    }

    await page.screenshot({ path: path.join(__dirname, '/img/result.png') });
    await browser.close();
})();