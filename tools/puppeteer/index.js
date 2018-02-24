const puppeteer = require('puppeteer');
const path = require('path');

const click = async function(page, selector) {
    await page.waitFor(selector);
    const xpath = await page.$x(selector);
    await xpath[0].click();
};

(async() => {
    const width = 1600
    const height = 900

    const browser = await puppeteer.launch({
        // headless: false,
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

    await page.goto('https://alpha.forticloud.com');
    await page.waitFor('input#email');

    await page.type('input#email', 'zqqiang@fortinet.com');
    await page.type('input[name="password"]', 'SuperCRM801');
    await page.click('input[type="submit"]');

    const fgt = '//div[text()="FGT60D4615007833"]';
    await page.waitFor(fgt);
    let xpath = await page.$x(fgt);
    await xpath[0].click();

    const Management = '//div[text()="Management"]';
    await page.waitFor(Management);
    xpath = await page.$x(Management);
    await xpath[0].click();

    await page.waitFor('select');

    // documentQueryAll
    await page.$$eval('div.second_menu_button_on_n', div => div[3].click());
    await page.$$eval('div.gwt-HTML', div => div[38].click());

    await page.waitFor(`//button[text()="Create New"]`)
    // jquery
    await page.evaluate(`$('button:eq(5)').click()`);

    await page.waitFor(`//span[text()="Save"]`)
    await page.evaluate(`$('input.gwt-TextBox:eq(0)').val("interface test")`);

    await page.waitFor(1000);

    await page.screenshot({ path: path.join(__dirname, 'alpha-main.png') });

    await browser.close();
})();