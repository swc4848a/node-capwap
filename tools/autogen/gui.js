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

let setup_seq = [
    "div.img_link:contains('FGT60D4615007833')",
    "div.cat_link:contains('Management')",
    "div.gwt-HTML:contains('Admin Settings')",
]

let adminsettings_seq = [
    ["HTTPPort", "input.gwt-TextBox:eq(0)", 100],
    ["HTTPSPort", "input.gwt-TextBox:eq(1)", 200],
]

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

        console.log('%s: %s', action, cmdseq[i]);

        switch (action) {
            case 'click':
                $(cmdseq[i]).click();
                break;
            case 'set':
                $(cmdseq[i][1]).val(cmdseq[i][2]);
                break;
            default:
                console.log('not support %s', action);
        }
    }
    console.log('%s done ......', head);
}

async function setup() {
    await seqrun(setup_seq, 'setup', 'click')
}

async function test() {
    await seqrun(adminsettings_seq, 'admin settings', 'set')
}

async function teardown() {
    await seqrun(teardown_seq, 'teardown', 'click')
}

function check() {
    let query = '';
    adminsettings_seq.forEach((item) => {
        query += (item[0] + '=' + item[2] + '&');
    });
    console.log(query);
    fetch('https://172.16.94.164:8443/Cli/AdminSettings?' + query, {
        mode: 'no-cors',
        header: {
            'Access-Control-Allow-Origin': '*',
        }
    })
}

async function run() {
    await setup();
    await test();
    await teardown();
    check();
}

run();