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
            return true;
        } else if ($('iframe').contents().find(selector).length) {
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
                if ($(selector).length) {
                    $(selector).click();
                    console.log('click:', selector);
                } else {
                    $('iframe').contents().find(selector).click();
                    console.log('iframe click:', selector);
                }
            }
            break;
        default:
            console.log('unsupport type', typeof value, selector);
    }
}

function verify(selector, expect) {
    function selectorValue(selector, type) {
        switch (type) {
            case 'string':
                return $(selector).val();
            case 'number':
                return parseInt($(selector).val());
            case 'boolean':
                return $(selector).prop("checked");
            default:
                console.log('unsupport selector type', type, selector);
                return undefined;
        }
    }

    function iframeSelectorValue(selector, type) {
        switch (type) {
            case 'string':
                return $('iframe').contents().find(selector).val();
            case 'number':
                return parseInt($('iframe').contents().find(selector).val());
            case 'boolean':
                return $('iframe').contents().find(selector).prop("checked");
            default:
                console.log('unsupport iframe selector type', type, selector);
                return undefined;
        }
    }

    switch (typeof expect) {
        case 'string':
        case 'number':
        case 'boolean':
            var value;
            if ($(selector).length) {
                value = selectorValue(selector, typeof expect);
            } else {
                value = iframeSelectorValue(selector, typeof expect);
            }
            var result = (value === expect);
            if (result) {
                console.log("config success", selector, value, expect);
            } else {
                console.log("*config failed", selector, value, expect);
            }
            break;
        case 'object':
            if (expect) {
                if ('delete' === expect.action) {
                    if ($(selector).length) {
                        console.log('*delete failed', selector);
                    } else {
                        if ($('iframe').contents().find(selector).length) {
                            console.log('*iframe delete failed', selector);
                        } else {
                            console.log('delete success', selector);
                        }
                    }
                } else if ('has' === expect.action) {
                    if ($('iframe').contents().find(selector).length) {
                        console.log("config success", selector, expect);
                    } else {
                        console.log("*config failed", selector, expect);
                    }
                } else {
                    console.log('*config failed: unsupport action', expect.action);
                }
            } else {
                if ($(selector).length) {
                    $(selector).click();
                    console.log('click:', selector);
                } else {
                    $('iframe').contents().find(selector).click();
                    console.log('iframe click:', selector);
                }
            }
            break;
        default:
            console.log('unsupport:', selector, typeof expect, expect);
    }
}

async function capture(page, step) {
    await page.render('./img/' + step + '.png');
    await sleep(2000);
}

async function runSeq(page, action, ready, key, seq) {
    for (let i = 0, j = 0; i < seq.length; ++i) {
        let selector = seq[i][0];
        let value = seq[i][1];
        let retry = 0;
        let max_try = 20;

        if (!(value && value.action === 'delete')) {
            while (!await ready(page, selector) && retry < max_try) {
                console.log('waiting %s s...', retry + 1);
                await sleep(1000);
                ++retry;
            }
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

function buildGateVerifySeq(key) {
    let gateSeq = [];
    console.log('load "%s" gate verify seqs', key);
    gatecases[key].forEach((item) => {
        gateSeq.push(item);
    })
    return gateSeq;
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
    await runSeq(gate_page, action, gateReady, 'login', buildGateLoginSeq());

    for (let key in cases) {
        if (skip(key)) {
            continue;
        }
        await runSeq(cloud_page, action, ready, S(key).slugify().s, buildCloudTestSeq(key));
        await runSeq(gate_page, verify, gateReady, S(key).slugify().s, buildGateVerifySeq(key));
    }

    await sleep(2000);
}

(async function() {
    const instance = await phantom.create(['--ignore-ssl-errors=yes'], { logLevel: 'error' });
    await start(instance);
    await instance.exit();
    console.log('instance exit...');
}());
