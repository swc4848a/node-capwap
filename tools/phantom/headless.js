const phantom = require('phantom');
const cases = require('./case.js');
const gatecases = require('./it/gatecases.js');
const util = require('util');
const S = require('string');
const deploy = require('./it/deploy.js');
const deployTemplate = require('./it/deployTemplate.js');
const importConfig = require('./it/import.js');
const login = require('./it/setup.js');
const logout = require('./it/logout.js');
const config = require('./config.js');
const { exec } = require('child_process');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let gateSeq = [];

async function ready(page, selector) {
    if (selector === 'skip') {
        console.log('skip %s', selector);
        return true;
    };
    if (selector === "img[width='113']") {
        await page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
    }
    return await page.evaluate(function(selector) {
        if (0 === $(selector).length) {
            console.log('not ready:', selector, $(selector)[0]);
        }
        return ($(selector).length !== 0);
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
            // console.log('$("' + selector + '").val("' + value + '"");');
            break;
        case 'boolean':
            $(selector).prop("checked", value);
            console.log('set', selector, value);
            // console.log('$("' + selector + '").prop("checked", ' + value + ');');
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
                if (selector === "img[width='113']") {
                    // window.location.href = 'https://beta.forticloud.com/loginmgrlogin';
                    // console.log('redirect to beta: https://beta.forticloud.com/loginmgrlogin')
                    // window.location.href = 'https://alpha.forticloud.com/loginmgrlogin';
                    // console.log('redirect to alpha: https://alpha.forticloud.com/loginmgrlogin')
                } else if ($(selector).length) {
                    $(selector).click();
                    console.log('click:', selector);
                    // console.log('$("' + selector + '").click();');
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
                if ($(selector)[0].localName === "span") {
                    return $(selector).text();
                } else {
                    return $(selector).val();
                }
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
                if ($('iframe').contents().find(selector)[0].localName === "span") {
                    return $('iframe').contents().find(selector).text();
                } else {
                    return $('iframe').contents().find(selector).val();
                }
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
                    if ($(selector).length) {
                        console.log("config success", selector, expect);
                    } else {
                        if ($('iframe').contents().find(selector).length) {
                            console.log("config success", selector, expect);
                        } else {
                            console.log("*config failed", selector, expect);
                        }
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
    console.log('capture -> ' + step + '.png');
    await sleep(2000);
}

async function runSeq(page, action, ready, key, seq) {
    for (let i = 0; i < seq.length; ++i) {
        let selector = seq[i][0];
        let value = seq[i][1];
        let retry = 0;
        let max_try = 40;

        if (value && value.action === 'sleep') {
            console.log('sleep start waiting %s s...', value.value);
            await sleep(value.value);
            console.log('sleep end waiting %s s...', value.value);
            continue;
        }
        if (value && value.action === 'redirect') {
            await page.evaluate(function(url) {
                window.history.pushState("", "", url);
            }, value.value);
            continue;
        }
        if (!(value && (value.action === 'delete'))) {
            while (!await ready(page, selector) && retry < max_try) {
                console.log('waiting %s s...', retry + 1);
                await sleep(1000);
                ++retry;
            }
        }
        if (retry === max_try) {
            console.log('retry timeout, return failed');
            await capture(page, key + '_failed');
            exec('cat /var/FortiGuard/cfgserver/' + config.fortigateSN + '/fulllog', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                process.exit();
            });
            break;
        }
        if ("span:contains('Close'), button:contains('OK')" === selector) {
            await capture(page, key);
        }
        // if ("div.popupContent button:contains('OK')" === selector) {
        //     await sleep(10000);
        // }
        if ("button:contains('Deploy')" === selector) {
            await sleep(1000);
        }

        // debug: capture each step if you need
        // await capture(page, `${key}${i}`);

        await page.evaluate(function(action, selector, value) {
            action(selector, value);
        }, action, selector, value);
    }
}

function skip(key) {
    return process.argv[2] && !S(key).contains(process.argv[2]);
}

function buildDevAlphaCloudLoginSeq() {
    return login.devAlpha;
}

function buildCloudLoginSeq() {
    return login.cloud;
}

function buildCloudTemplateLoginSeq() {
    return login.template;
}

function buildGateLoginSeq() {
    return login.gate;
}

function buildGateLogoutSeq() {
    return logout.gate;
}

function buildCloudTestSeq(key) {
    let cloudSeq = [];
    console.log('load "%s" test cases', key);
    if (!isTemplateCase(key)) {
        importConfig.forEach((item) => {
            cloudSeq.push(item);
        })
    }
    cases[key].forEach((item) => {
        cloudSeq.push(item);
    })
    if (isTemplateCase(key)) {
        deployTemplate.forEach((item) => {
            cloudSeq.push(item);
        })
    } else {
        deploy.forEach((item) => {
            cloudSeq.push(item);
        })
    }
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
    return await setupPage(instance, 'https://alpha.forticloud.com', true);
}

async function setupGatePage(instance) {
    return await setupPage(instance, config.fortigateUrl, true);
}

function isTemplateCase(key) {
    return key.indexOf('template:') !== -1;
}

function isMultiTenancy() {
    // todo:
    return false;
}

async function start() {
    for (let key in cases) {
        if (skip(key)) {
            continue;
        }

        const instance = await phantom.create(['--ignore-ssl-errors=yes'], { logLevel: 'error' });
        const cloud_page = await setupCloudPage(instance);
        const gate_page = await setupGatePage(instance);

        if (isMultiTenancy()) {
            // temporary disable template test
            if (0 && isTemplateCase(key)) {
                await runSeq(cloud_page, action, ready, 'login', buildCloudTemplateLoginSeq());
            } else {
                await runSeq(cloud_page, action, ready, 'login', buildCloudLoginSeq());
            }
        } else {
            await runSeq(cloud_page, action, ready, 'login', buildCloudLoginSeq());
        }
        await runSeq(gate_page, action, gateReady, 'login', buildGateLoginSeq());

        await runSeq(cloud_page, action, ready, S(key).slugify().s, buildCloudTestSeq(key));
        await runSeq(gate_page, verify, gateReady, S(key).slugify().s, buildGateVerifySeq(key));

        await runSeq(gate_page, action, ready, 'logout', buildGateLogoutSeq());

        await instance.exit();
        console.log('instance exit...');
    }
}

(async function() {
    await start();
}());