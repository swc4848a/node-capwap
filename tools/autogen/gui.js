'use strict'

// let url = 'https://beta.forticloud.com/com.fortinet.gwt.Main/Main.html'

// let params = 'locale=en_US'

// window.location.href = url + '?' + params

let is_valid = (selector) => {
    switch (typeof selector) {
        case 'string':
            return selector ? ($(selector)[0] !== undefined) : true;
        case 'object':
            return $(selector[1])[0] !== undefined;
        case 'undefined':
            return true;
        default:
            console.log('not support %s', typeof selector);
            return false;
    }
}

let getSetupSeq = (module) => {
    return [
        "div.img_link:contains('FGT60D4615007833')",
        "div.cat_link:contains('Management')",
        "div.gwt-HTML:contains('" + module + "')",
    ]
}

// [cli-attr, dom-selector, cli-value, {dom-value}]
let testSeq = {
    'Admin Settings': [
        ["admin-port", "input.gwt-TextBox:eq(0)", 80],
        ["admin-https-redirect", "span.gwt-CheckBox>label", "enable", true],
        ["admin-sport", "input.gwt-TextBox:eq(1)", 443],
        ["admin-telnet-port", "input.gwt-TextBox:eq(2)", 23],
        ["admin-ssh-port", "input.gwt-TextBox:eq(3)", 22],
        ["admintimeout", "input.gwt-TextBox:eq(4)", 480],
    ],
    'Routing': [
        [undefined, "button[title='Create New']", undefined],
        ["dst.ip", "input.gwt-TextBox:eq(0)", "192.168.18.0"],
        ["dst.mask", "input.gwt-TextBox:eq(1)", "255.255.255.0"],
        ["gateway", "input.gwt-TextBox:eq(2)", "192.168.1.1"],
        ["distance", "input.gwt-TextBox:eq(3)", 11],
        ["comment", "textarea.gwt-TextArea", "test comments"],
    ]
}

let getTestSeq = (module) => {
    if (testSeq[module]) {
        return testSeq[module];
    } else {
        console.log('not support %s now', module);
        return [];
    }
}

let teardown_seq = [
    "span:contains('Save')",
    "button[title='Deploy']",
    "span:contains('YES')",
    "button:contains('OK')",
    "span:contains('Close')",
    "div.logo:contains('FortiCloud')"
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dom_oper(selector, value) {
    switch (typeof value) {
        case 'string':
        case 'number':
            $(selector).val(value);
            break;
        case 'boolean':
        case 'undefined':
            $(selector).click();
            break;
        default:
            console.log('not support %s, do nothing', typeof value);
    }
}

const timeout = 15;

async function seqrun(cmdseq, head, action) {
    console.log('%s starting ......', head);
    for (let i = 0; i < cmdseq.length; ++i) {
        let retry = 0;
        while (!is_valid(cmdseq[i]) && retry < timeout) {
            ++retry
            console.log('......')
            await sleep(1000);
        }
        if (retry == timeout) {
            console.log('%d times check failed -> exit', timeout);
            break;
        }

        switch (typeof cmdseq[i]) {
            case 'string':
                console.log('%s: %s', action, cmdseq[i]);
                break;
            case 'object':
                console.log('%s: %s', action, cmdseq[i][0]);
                break;
            default:
                console.log('not support type %s', typeof cmdseq[i]);
        }

        switch (action) {
            case 'click':
                $(cmdseq[i]).click();
                break;
            case 'set':
                let value = cmdseq[i][3] ? cmdseq[i][3] : cmdseq[i][2];
                dom_oper(cmdseq[i][1], value);
                break;
            default:
                console.log('not support %s', action);
        }
    }
    console.log('%s done ......', head);
}

async function setup(module) {
    await seqrun(getSetupSeq(module), 'setup', 'click')
}

async function test(module) {
    await seqrun(getTestSeq(module), module, 'set')
}

async function teardown() {
    await seqrun(teardown_seq, 'teardown', 'click')
}

function check(module) {
    let query = '';
    getTestSeq(module).forEach((item) => {
        if (item[0]) {
            query += (item[0] + '=' + item[2] + '&');
        }
    });
    console.log(query);
    fetch('https://172.16.94.164:8443/Cli/' + module + '?' + query, {
        mode: 'no-cors',
        header: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}

async function testcase(module) {
    await setup(module);
    await test(module);
    await teardown();
    await check(module);
}

async function run() {
    // await testcase("Admin Settings");
    await testcase("Routing");
}

run();
