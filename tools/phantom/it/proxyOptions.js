let Testcase = require('../testcase.js');

let cloudMap = {
    'Proxy Options': "div.gwt-HTML:contains('Proxy Options'):eq(0)",

    'Log Oversized Files': "input:checkbox:eq(0)",
    'RPC over HTTP': "input:checkbox:eq(1)",
    'HTTP': "input:checkbox:eq(2)",
    'SMTP': "input:checkbox:eq(3)",
    'POP3': "input:checkbox:eq(4)",
    'IMAP': "input:checkbox:eq(5)",
    'FTP': "input:checkbox:eq(6)",
    'NNTP': "input:checkbox:eq(7)",
    'MAPI': "input:checkbox:eq(8)",
    'DNS': "input:checkbox:eq(9)",
    'Comfort Clients': "input:checkbox:eq(10)",
    'Interval (seconds)': "input:text:eq(91)",
    'Amount (bytes)': "input:text:eq(92)",
    'Block Oversized File/Email': "input:checkbox:eq(11)",
    'Threshold (MB)': "input:text:eq(95)",
    'Enable Chunked Bypass': "input:checkbox:eq(12)",
    'Add Fortinet Bar': "input:checkbox:eq(13)",
    'Communication Port': "input:text:eq(100)",
    'Allow Fragmented Messages': "input:checkbox:eq(14)",
    'Append Signature (SMTP)': "input:checkbox:eq(15)",
    'Email Signature Text': "textarea.gwt-TextArea",

    'All Any': "label:contains('Any')",
    'All Checkbox': "input:checkbox",

    'Save': "span:contains('Save')",
}

let gateMap = {
    'Proxy Options': "a[ng-href='page/p/firewall/proxy_options/edit/default/']",
    'Log Oversized Files': "input#oversize-log",
    'RPC over HTTP':"input#rpc-over-http",
    'HTTP':"input[name='http.status']",
    'HTTP ports':"input[name='http.ports']",
    'SMTP':"input[name='smtp.status']",
    'SMTP ports':"input[name='smtp.ports']",
    'POP3':"input[name='pop3.status']",
    'POP3 ports':"input[name='pop3.ports']",
    'IMAP':"input[name='imap.status']",
    'IMAP ports':"input[name='imap.ports']",
    'FTP':"input[name='ftp.status']",
    'FTP ports':"input[name='ftp.ports']",
    'NNTP':"input[name='nntp.status']",
    'NNTP ports':"input[name='nntp.ports']",
    'MAPI':"input[name='mapi.status']",
    'MAPI ports':"input[name='mapi.ports']",
    'DNS':"input[name='dns.status']",
    'DNS ports':"input[name='dns.ports']",
    'Comfort Clients':"input[name='common.options.clientcomfort']",
    'Interval(seconds)':"input[name='common.comfort-interval']",
    'Amount(bytes)':"input[name='common.comfort-amount']",
    'Block Oversized File/Email':"input[name='common.options.oversize']",
    'Threshold(MB)':"input[name='common.oversize-limit']",
    'Chunked Bypass':"input[name='http.options.chunkedbypass']",
    'Add Fortinet Bar':"input[name='http.fortinet-bar']",
    'Communication Port':"input[name='http.fortinet-bar-port']",
    'Allow Fragmented Messages':"input[name='common.options.fragmail']",
    'Append Signature (SMTP)':"input[name='mail-signature.status']",
    'Email Signature Text':"textarea[name='mail-signature.signature']",
}

new Testcase({
    name: 'proxy options edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Proxy Options')

        c.click('Log Oversized Files')
        c.click('RPC over HTTP')
        c.click('HTTP')
        c.click('SMTP')
        c.click('POP3')
        c.click('IMAP')
        c.click('FTP')
        c.click('NNTP')
        c.click('MAPI')
        c.click('DNS')

        c.click('Comfort Clients')
        c.set('Interval (seconds)', 1)
        c.set('Amount (bytes)', 2)

        c.click('Block Oversized File/Email')
        c.set('Threshold (MB)', 10)

        c.click('Enable Chunked Bypass')
        c.click('Add Fortinet Bar')
        c.set('Communication Port', 400)

        c.click('Allow Fragmented Messages')
        c.click('Append Signature (SMTP)')
        c.set('Email Signature Text', "Email Signature Text test")

        c.click('Save')
    },
    verify: (g) => {
        g.click('Proxy Options')
        g.isChecked('Log Oversized Files')
        g.isChecked('RPC over HTTP')
        g.isChecked('HTTP')
        g.isSet('HTTP ports', 80)
        g.isChecked('SMTP')
        g.isSet('SMTP ports', 25)
        g.isChecked('POP3')
        g.isSet('POP3 ports', 110)
        g.isChecked('IMAP')
        g.isSet('IMAP ports', 143)
        g.isChecked('FTP')
        g.isSet('FTP ports', 21)
        g.isChecked('NNTP')
        g.isSet('NNTP ports', 119)
        g.isChecked('MAPI')
        g.isSet('MAPI ports', 135)
        g.isChecked('DNS')
        g.isSet('DNS ports', 53)
        g.isChecked('Comfort Clients')
        g.isSet('Interval(seconds)', 1)
        g.isSet('Amount(bytes)', 2)
        g.isChecked('Block Oversized File/Email')
        g.isSet('Threshold(MB)', 10)
        g.isChecked('Chunked Bypass')
        g.isChecked('Add Fortinet Bar')
        g.isSet('Communication Port', 400)
        g.isChecked('Allow Fragmented Messages')
        g.isChecked('Append Signature (SMTP)')
        g.isSet('Email Signature Text', "Email Signature Text test")
    }
})

new Testcase({
    name: 'proxy options clean',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Proxy Options')

        c.unchecked('All Checkbox')

        c.click('Save')
    },
    verify: (g) => {
        g.click('Proxy Options')
        g.isUnchecked('Log Oversized Files')
        g.isUnchecked('RPC over HTTP')
        g.isUnchecked('HTTP')
        g.isUnchecked('SMTP')
        g.isUnchecked('POP3')
        g.isUnchecked('IMAP')
        g.isUnchecked('FTP')
        g.isUnchecked('NNTP')
        g.isUnchecked('MAPI')
        g.isUnchecked('DNS')
        g.isUnchecked('Comfort Clients')
        g.isUnchecked('Block Oversized File/Email')
        g.isUnchecked('Chunked Bypass')
        g.isUnchecked('Add Fortinet Bar')
        g.isUnchecked('Allow Fragmented Messages')
        g.isUnchecked('Append Signature (SMTP)')
    }
})