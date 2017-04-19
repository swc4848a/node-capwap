const phantom = require('phantom');
const cases = require('./case.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// [selector, {value}]

let login = [
    ["input#email", "zqqiang@fortinet.com"],
    ["input[name='password']", "SuperCRM801"],
    ["input[type='submit']"],
    ["div.img_link:contains('FGT60D4615007833')"],
    ["div.cat_link:contains('Management')"],
]

let deploy = [
    ["button[title='Deploy']"],
    ["span:contains('YES')"],
    ["button:contains('OK')"],
    ["span:contains('Close')"],
]

let seq = [];

function buildSeq() {
    login.forEach((item) => {
        seq.push(item);
    })
    for (let key in cases) {
        console.log('load "%s" test cases', key);
        cases[key].forEach((item) => {
            seq.push(item);
        })
    }
    deploy.forEach((item) => {
        seq.push(item);
    })
}

async function ready(page, selector) {
    let result = await page.evaluate(function(selector) {
        return ($(selector)[0] !== undefined);
    }, selector);
    console.log('selector:%s -> %s', selector, result);
    return result;
}

function action(selector, value) {
    switch (typeof value) {
        case 'string':
        case 'number':
            $(selector).val(value);
            break;
        case 'boolean':
            $(selector).prop("checked", value);
            break;
        default:
            $(selector).click();
    }
}

(async function() {
    const instance = await phantom.create([], { logLevel: 'error' });
    const page = await instance.createPage();

    await page.property('viewportSize', {
        width: 1500,
        height: 900
    });

    const status = await page.open('https://beta.forticloud.com/com.fortinet.gwt.Main/login.jsp');
    console.log(`Page opened with status [${status}].`);

    buildSeq();

    for (let i = 0; i < seq.length; ++i) {
        let selector = seq[i][0];
        let value = seq[i][1];
        let retry = 0;
        let max_try = 20;

        while (!await ready(page, selector) && retry < max_try) {
            console.log('waiting %s s...', retry + 1);
            await sleep(1000);
            ++retry;
        }
        if (retry === max_try) {
            console.log('retry timeout, return failed');
            break;
        }
        await page.evaluate(function(action, selector, value) {
            action(selector, value);
        }, action, selector, value);
        console.log('set %s %s', selector, value);
    }

    await sleep(1000);

    await page.render('./img/forticloud.png');
    console.log('save as ./img/forticloud.png');

    await sleep(2000);

    await instance.exit();
    console.log('instance exit...');
}());
