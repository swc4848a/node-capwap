const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const cases = require('./src/cases');

let filter = undefined;
if (process.argv.length > 2) {
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

    const browser = await puppeteer.launch({
        // headless: false,
        // slowMo: 250,
        args: [
            `--window-size=${width},${height}`
        ]
    });

    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    page.setViewport({
        width: width,
        height: height,
    });

    try {
        for (const testcase of cases) {
            if (filter && !testcase.name.includes(filter))
                continue;
            console.log(`run testcase: ${testcase.name}`)
            for (const item of testcase.seq) {
                switch (item.action) {
                    case `goto`:
                        await page.goto(item.url)
                        break
                    case `type`:
                        await page.waitFor(item.sel)
                        await page.type(item.sel, item.val)
                        break
                    case `click`:
                        if (item.sel.startsWith(`//`)) {
                            const elem = await page.waitFor(item.sel)
                            await elem.click()
                        } else {
                            await page.click(item.sel)
                        }
                        break
                    case `wait`:
                        await page.waitFor(item.timeout)
                        break
                    case `checked`:
                        await page.$eval(`$('${item.sel}').prop("checked", ${item.val})`)
                        break
                    case `isType`:
                        const frame = page.frames().find(frame => frame.name().includes('embedded-iframe'));
                        const result = await frame.$eval(`${item.sel}`, el => el.value)
                        console.log(`  result: ${result} expect: ${item.expect} => ${result === item.expect ? 'success' : 'failed'}`)
                        break
                    default:
                        console.log(`unsupport action: ${action}`)
                }
            }
        }
    } catch (error) {
        console.log(`catch: `, error)
    }

    await page.screenshot({ path: path.join(__dirname, '/img/alpha-main.png') });
    await browser.close();
})();