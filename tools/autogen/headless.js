const phantom = require('phantom');
const cases = require('./case.js');
const util = require('util');
const S = require('string');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let cloudSeq = [];
let gateSeq = [];

function factory() {
    for (let key in cases) {
        console.log('load "%s" test cases', key);
        cases[key].forEach((item) => {
            cloudSeq.push(item);
        })
        if (key !== 'deploy') {
            cases[key].forEach((item) => {
                gateSeq.push(item);
            })
        }
    }
}

async function ready(page, selector) {
    if (selector === 'skip') {
        console.log('skip %s', selector);
        return true;
    };
    return await page.evaluate(function(selector) {
        if (!$(selector)[0]) {
            console.log('ready:', selector, $(selector)[0]);
        }
        return ($(selector)[0] !== undefined);
    }, selector);
}

function action(selector, value) {
    switch (typeof value) {
        case 'string':
        case 'number':
            $(selector).val(value);
            console.log('set', selector, value);
            break;
        case 'boolean':
            $(selector).prop("checked", value);
            console.log('set', selector, value);
            break;
        default:
            console.log('default: click', selector, $(selector)[0]);
            $(selector).click();
    }
}

function gateAction(selector, value, expect) {
    switch (typeof value) {
        case 'string':
        case 'number':
            $(selector).val(value);
            console.log('set', selector, value);
            break;
        case 'boolean':
            $(selector).prop("checked", value);
            console.log('set', selector, value);
            break;
        case 'object':
            if (value === null) {
                if (!expect) {
                    $(selector).click();
                    console.log('click', selector);
                }
            } else if ('dblclick' === value.action) {
                $(selector).dblclick();
                console.log('dblclick', selector);
            }
            break;
        default:
            console.log('unsupport object:', selector, value, expect);
    }

    switch (typeof expect) {
        case 'string':
            if (expect === $(selector).val()) {
                console.log('config success:', selector, $(selector).val(), expect)
            } else {
                console.log('config failed:', selector, $(selector).val(), expect)
            }
            break;
        case 'number':
            if (expect === parseInt($(selector).val())) {
                console.log('config success:', selector, $(selector).val(), expect)
            } else {
                console.log('config failed:', selector, $(selector).val(), expect)
            }
            break;
        case 'boolean':
            if (expect === $(selector).prop("checked")) {
                console.log('config success:', selector, $(selector).val(), expect)
            } else {
                console.log('config failed:', selector, $(selector).val(), expect)
            }
            break;
        default:
            console.log('default:', selector, expect);
    }
}

async function capture(page, step) {
    await page.render('./img/' + step + '.png');
    await sleep(2000);
}

(async function() {
    const instance = await phantom.create(['--ignore-ssl-errors=yes'], { logLevel: 'error' });
    const page = await instance.createPage();

    await page.on('onConsoleMessage', function(msg) {
        console.log(msg);
    });

    await page.property('viewportSize', {
        width: 1500,
        height: 900
    });

    const status = await page.open('https://beta.forticloud.com/com.fortinet.gwt.Main/login.jsp');
    console.log(`FortiCloud Page opened with status [${status}].`);

    page.onConsoleMessage = function(msg) {
        system.stderr.writeLine('console: ' + msg);
    };

    factory();

    for (let i = 0; i < cloudSeq.length; ++i) {
        let selector = cloudSeq[i][0];
        let value = cloudSeq[i][1];
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
        // await capture(page, i);
        await page.evaluate(function(action, selector, value) {
            action(selector, value);
        }, action, selector, value);
    }

    await sleep(1000);

    await page.render('./img/forticloud.png');
    console.log('save as ./img/forticloud.png');

    await sleep(2000);

    const gatePage = await instance.createPage();

    await gatePage.on('onConsoleMessage', function(msg) {
        console.log(msg);
    });

    await gatePage.property('viewportSize', {
        width: 1500,
        height: 900
    });
    const gateStatus = await gatePage.open('https://172.16.95.49/login');
    console.log(`FortiGate Page opened with status [${gateStatus}].`);

    await gatePage.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');

    for (let i = 0; i < gateSeq.length; ++i) {
        let selector = gateSeq[i][2];
        let value = gateSeq[i][3];
        let expect = gateSeq[i][1];
        let retry = 0;
        let max_try = 20;

        while (!await ready(gatePage, selector) && retry < max_try) {
            console.log('waiting %s s...', retry + 1);
            await sleep(1000);
            ++retry;
        }
        if (retry === max_try) {
            console.log('retry timeout, return failed');
            break;
        }
        if (selector === 'skip') {
            continue;
        }
        await gatePage.evaluate(function(action, selector, value, expect) {
            action(selector, value, expect);
        }, gateAction, selector, value, expect);
    }

    await sleep(3000);

    await gatePage.render('./img/fortigate.png');
    console.log('save as ./img/fortigate.png');

    await sleep(2000);

    await instance.exit();
    console.log('instance exit...');
}());
