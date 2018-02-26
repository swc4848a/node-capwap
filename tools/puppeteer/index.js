const puppeteer = require('puppeteer');
const path = require('path');

let testcase = [
    [`goto`, `https://alpha.forticloud.com`],
    [`type`, `input#email`, `zqqiang@fortinet.com`],
    [`type`, `input[name="password"]`, `SuperCRM801`],
    [`click`, `input[type="submit"]`],
    [`click`, `//div[text()="ZQQ-APNETWORK-DEV"]`],
    [`click`, `//div[text()="Configure"]`],
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

    for (const item of testcase) {
        action = item[0]
        key = item[1]
        val = item[2]

        switch (action) {
            case `goto`:
                await page.goto(key)
                break
            case `type`:
                await page.waitFor(key)
                await page.type(key, val)
                break
            case `click`:
                if (key.startsWith(`//`)) {
                    await page.waitFor(key, { visible: true })
                        .then((elem) => elem.click())
                } else {
                    await page.click(key)
                }
                break
            default:
                console.log(`unsupport action: ${action}`)
        }
    }


    // // documentQueryAll
    // await page.$$eval('div.second_menu_button_on_n', div => div[3].click());
    // await page.$$eval('div.gwt-HTML', div => div[38].click());

    // await page.waitFor(`//button[text()="Create New"]`)
    // // jquery
    // await page.evaluate(`$('button:eq(5)').click()`);

    // await page.waitFor(`//span[text()="Save"]`)
    // await page.evaluate(`$('input.gwt-TextBox:eq(0)').val("interface test")`);

    await page.waitFor(1000);

    await page.screenshot({ path: path.join(__dirname, 'alpha-main.png') });

    await browser.close();
})();