const puppeteer = require('puppeteer');
const path = require('path');

let testcase = [
    [`goto`, `https://alpha.forticloud.com`],
    [`type`, `input#email`, `zqqiang@fortinet.com`],
    [`type`, `input[name="password"]`, `SuperCRM801`],
    [`click`, `input[type="submit"]`],
    [`wait`, 3000],
    [`click`, `//div[text()="ZQQ-APNETWORK-DEV"]`],
    [`click`, `//div[text()="Configure"]`],
    [`wait`, 3000],
];

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

    let action
    let key
    let val
    let timeout
    let url

    try {
        for (const item of testcase) {
            action = item[0]
            switch (action) {
                case `goto`:
                    url = item[1]
                    await page.goto(url)
                    break
                case `type`:
                    key = item[1]
                    val = item[2]
                    await page.waitFor(key)
                    await page.type(key, val)
                    break
                case `click`:
                    key = item[1]
                    if (key.startsWith(`//`)) {
                        const elem = await page.waitFor(key)
                        await elem.click()
                    } else {
                        await page.click(key)
                    }
                    break
                case `wait`:
                    timeout = item[1]
                    await page.waitFor(timeout)
                    break
                default:
                    console.log(`unsupport action: ${action}`)
            }
        }
    } catch (error) {
        console.log(`catch ${error}`)
    }


    // // documentQueryAll
    // await page.$$eval('div.second_menu_button_on_n', div => div[3].click());
    // await page.$$eval('div.gwt-HTML', div => div[38].click());

    // await page.waitFor(`//button[text()="Create New"]`)
    // // jquery
    // await page.evaluate(`$('button:eq(5)').click()`);

    // await page.waitFor(`//span[text()="Save"]`)
    // await page.evaluate(`$('input.gwt-TextBox:eq(0)').val("interface test")`);

    await page.screenshot({ path: path.join(__dirname, 'alpha-main.png') });
    await browser.close();
})();