const phantom = require('phantom');
const cases = require('./case.js');
const gatecases = require('./it/gatecases.js');
const util = require('util');
const S = require('string');
const deploy = require('./it/deploy.js');
const login = require('./it/setup.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let gateSeq = [];

async function ready(page, selector) {
    if (selector === 'skip') {
        console.log('skip %s', selector);
        return true;
    };
    return await page.evaluate(function(selector) {
        if (!$(selector)[0]) {
            console.log('not ready:', selector, $(selector)[0]);
        }
        return ($(selector)[0] !== undefined);
    }, selector);
}

async function gateReady(page, selector) {
    if (selector === 'skip') {
        console.log('skip %s', selector);
        return true;
    };
    return await page.evaluate(function(selector) {
        if ($(selector).length) {
            console.log('gate ready:', selector, $(selector).length);
            return true;
        } else if ($('iframe').contents().find(selector).length) {
            console.log('gate iframe ready:', selector, $(selector).length);
            return true;
        } else {
            console.log('gate not ready:', selector);
            return false;
        }
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
        case 'object':
            if (value) {
                if ('hide' === value.action) {
                    $(selector).hide();
                    console.log('hide:', selector);
                } else {
                    console.log('unsupport action', action);
                }
            } else {
                console.log('value', value);
                $(selector).click();
                console.log('click:', selector);
            }
            break;
        default:
            console.log('unsupport type', typeof value, selector);
    }
}

// function gateAction(selector, value, expect) {
//     switch (typeof value) {
//         case 'string':
//         case 'number':
//             $(selector).val(value);
//             console.log('set', selector, value);
//             break;
//         case 'boolean':
//             $(selector).prop("checked", value);
//             console.log('set', selector, value);
//             break;
//         case 'object':
//             if ($(selector).length) {
//                 $(selector).click();
//                 console.log('click:', selector);
//             } else {
//                 $('iframe').contents().find(selector).click();
//                 console.log('iframe click:', selector);
//             }
//             break;
//         default:
//             console.log('unsupport:', selector, typeof value, expect);
//     }

//     switch (typeof expect) {
//         case 'string':
//             if ($(selector).length) {
//                 if (expect === $(selector).val()) {
//                     console.log('----------------------------------------------------------');
//                     console.log('* config success:', selector, $(selector).val(), expect);
//                     console.log('----------------------------------------------------------');
//                 } else {
//                     console.log('**********************************************************')
//                     console.log('* config failed:', selector, $(selector).val(), expect)
//                     console.log('**********************************************************');
//                 }
//             } else {
//                 if (expect === $('iframe').contents().find(selector).val()) {
//                     console.log('----------------------------------------------------------');
//                     console.log('* config success:', selector, $('iframe').contents().find(selector).val(), expect);
//                     console.log('----------------------------------------------------------');
//                 } else {
//                     console.log('**********************************************************')
//                     console.log('* config failed:', selector, $('iframe').contents().find(selector).val(), expect)
//                     console.log('**********************************************************');
//                 }
//             }
//             break;
//         case 'number':
//             if ($(selector).length) {
//                 if (expect === parseInt($(selector).val())) {
//                     console.log('----------------------------------------------------------');
//                     console.log('* config success:', selector, $(selector).val(), expect);
//                     console.log('----------------------------------------------------------');
//                 } else {
//                     console.log('**********************************************************')
//                     console.log('* config failed:', selector, $(selector).val(), expect)
//                     console.log('**********************************************************');
//                 }
//             } else {
//                 if (expect === parseInt($('iframe').contents().find(selector).val())) {
//                     console.log('----------------------------------------------------------');
//                     console.log('* config success:', selector, $('iframe').contents().find(selector).val(), expect);
//                     console.log('----------------------------------------------------------');
//                 } else {
//                     console.log('**********************************************************')
//                     console.log('* config failed:', selector, $('iframe').contents().find(selector).val(), expect)
//                     console.log('**********************************************************');
//                 }
//             }
//             break;
//         case 'boolean':
//             if ($(selector).length) {
//                 if (expect === $(selector).prop("checked")) {
//                     console.log('----------------------------------------------------------');
//                     console.log('* config success:', selector, $(selector).prop("checked"), expect);
//                     console.log('----------------------------------------------------------');
//                 } else {
//                     console.log('**********************************************************')
//                     console.log('* config failed:', selector, $(selector).prop("checked"), expect)
//                     console.log('**********************************************************');
//                 }
//             } else {
//                 if (expect === $('iframe').contents().find(selector).prop("checked")) {
//                     console.log('----------------------------------------------------------');
//                     console.log('* config success:', selector, $('iframe').contents().find(selector).prop("checked"), expect);
//                     console.log('----------------------------------------------------------');
//                 } else {
//                     console.log('**********************************************************')
//                     console.log('* config failed:', selector, $('iframe').contents().find(selector).prop("checked"), expect)
//                     console.log('**********************************************************');
//                 }
//             }
//             break;
//         default:
//             console.log('unsupport:', selector, typeof expect, expect);
//     }
// }

function gateAction(selector, value) {
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
            if ($(selector).length) {
                $(selector).click();
                console.log('click:', selector);
            } else {
                $('iframe').contents().find(selector).click();
                console.log('iframe click:', selector);
            }
            break;
        default:
            console.log('unsupport:', selector, typeof value, expect);
    }
}

async function capture(page, step) {
    await page.render('./img/' + step + '.png');
    await sleep(2000);
}

async function gateVerify(instance) {
    const gatePage = await instance.createPage();

    await gatePage.on('onConsoleMessage', function(msg) {
        console.log(msg);
    });

    await gatePage.property('viewportSize', {
        width: 1500,
        height: 2000
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

        while (!await gateReady(gatePage, selector) && retry < max_try) {
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
}

async function runSeq(page, action, ready, key, seq) {
    console.log(seq);
    for (let i = 0, j = 0; i < seq.length; ++i) {
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
        if ("span:contains('Close')" === selector) {
            await capture(page, key);
        }
        await page.evaluate(function(action, selector, value) {
            action(selector, value);
        }, action, selector, value);
    }
}

function skip(key) {
    return process.argv[2] && !S(key).contains(process.argv[2]);
}

function buildCloudLoginSeq() {
    return login.cloud;
}

function buildGateLoginSeq() {
    return login.gate;
}

function buildCloudTestSeq(key) {
    let cloudSeq = [];
    console.log('load "%s" test cases', key);
    cases[key].forEach((item) => {
        cloudSeq.push(item);
    })
    deploy.forEach((item) => {
        cloudSeq.push(item);
    })
    return cloudSeq;
}

async function setupPage(instance, url, jquery) {
    const page = await instance.createPage();

    await page.on('onConsoleMessage', function(msg) {
        console.log(msg);
    });

    await page.property('viewportSize', {
        width: 1500,
        height: 2000
    });

    const status = await page.open(url);
    console.log(`${url} Page opened with status [${status}].`);

    page.onConsoleMessage = function(msg) {
        system.stderr.writeLine('console: ' + msg);
    };

    if (jquery) {
        await page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
    }

    return page;
}

async function setupCloudPage(instance) {
    return await setupPage(instance, 'https://beta.forticloud.com/com.fortinet.gwt.Main/login.jsp', false);
}

async function setupGatePage(instance) {
    return await setupPage(instance, 'https://172.16.95.49/login', true);
}

async function start(instance) {
    const cloud_page = await setupCloudPage(instance);
    const gate_page = await setupGatePage(instance);

    await runSeq(cloud_page, action, ready, 'login', buildCloudLoginSeq());
    await runSeq(gate_page, gateAction, gateReady, 'login', buildGateLoginSeq());

    for (let key in cases) {
        if (skip(key)) {
            continue;
        }
        await runSeq(cloud_page, action, ready, S(key).slugify().s, buildCloudTestSeq(key));
        // await runSeq(gate_page, action, S(key).slugify().s, buildCloudTestSeq(key));
    }

    await sleep(2000);
}

(async function() {
    const instance = await phantom.create(['--ignore-ssl-errors=yes'], { logLevel: 'error' });
    await start(instance);
    await instance.exit();
    console.log('instance exit...');
}());
