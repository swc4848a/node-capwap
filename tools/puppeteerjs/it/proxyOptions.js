let Testcase = require('../src/testcase.js');

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
    'RPC over HTTP': "input#rpc-over-http",
    'HTTP': "input[name='http.status']",
    'HTTP ports': "input[name='http.ports']",
    'SMTP': "input[name='smtp.status']",
    'SMTP ports': "input[name='smtp.ports']",
    'POP3': "input[name='pop3.status']",
    'POP3 ports': "input[name='pop3.ports']",
    'IMAP': "input[name='imap.status']",
    'IMAP ports': "input[name='imap.ports']",
    'FTP': "input[name='ftp.status']",
    'FTP ports': "input[name='ftp.ports']",
    'NNTP': "input[name='nntp.status']",
    'NNTP ports': "input[name='nntp.ports']",
    'MAPI': "input[name='mapi.status']",
    'MAPI ports': "input[name='mapi.ports']",
    'DNS': "input[name='dns.status']",
    'DNS ports': "input[name='dns.ports']",
    'Comfort Clients': "input[name='common.options.clientcomfort']",
    'Interval(seconds)': "input[name='common.comfort-interval']",
    'Amount(bytes)': "input[name='common.comfort-amount']",
    'Block Oversized File/Email': "input[name='common.options.oversize']",
    'Threshold(MB)': "input[name='common.oversize-limit']",
    'Chunked Bypass': "input[name='http.options.chunkedbypass']",
    'Add Fortinet Bar': "input[name='http.fortinet-bar']",
    'Communication Port': "input[name='http.fortinet-bar-port']",
    'Allow Fragmented Messages': "input[name='common.options.fragmail']",
    'Append Signature (SMTP)': "input[name='mail-signature.status']",
    'Email Signature Text': "textarea[name='mail-signature.signature']",
}

new Testcase({
    name: 'proxy options edit',
    testcase() {
        this.click(cloudMap['Proxy Options'])

        this.click(cloudMap['Log Oversized Files'])
        this.click(cloudMap['RPC over HTTP'])
        this.click(cloudMap['HTTP'])
        this.click(cloudMap['SMTP'])
        this.click(cloudMap['POP3'])
        this.click(cloudMap['IMAP'])
        this.click(cloudMap['FTP'])
        this.click(cloudMap['NNTP'])
        this.click(cloudMap['MAPI'])
        this.click(cloudMap['DNS'])

        this.click(cloudMap['Comfort Clients'])
        this.set(cloudMap['Interval (seconds)'], 1)
        this.set(cloudMap['Amount (bytes)'], 2)

        this.click(cloudMap['Block Oversized File/Email'])
        this.set(cloudMap['Threshold (MB)'], 10)

        this.click(cloudMap['Enable Chunked Bypass'])
        this.click(cloudMap['Add Fortinet Bar'])
        this.set(cloudMap['Communication Port'], 400)

        this.click(cloudMap['Allow Fragmented Messages'])
        this.click(cloudMap['Append Signature (SMTP)'])
        this.set(cloudMap['Email Signature Text'], "Email Signature Text test")

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Proxy Options'])
        this.isCheck(gateMap['Log Oversized Files'])
        this.isCheck(gateMap['RPC over HTTP'])
        this.isCheck(gateMap['HTTP'])
        this.isSet(gateMap['HTTP ports'], 80)
        this.isCheck(gateMap['SMTP'])
        this.isSet(gateMap['SMTP ports'], 25)
        this.isCheck(gateMap['POP3'])
        this.isSet(gateMap['POP3 ports'], 110)
        this.isCheck(gateMap['IMAP'])
        this.isSet(gateMap['IMAP ports'], 143)
        this.isCheck(gateMap['FTP'])
        this.isSet(gateMap['FTP ports'], 21)
        this.isCheck(gateMap['NNTP'])
        this.isSet(gateMap['NNTP ports'], 119)
        this.isCheck(gateMap['MAPI'])
        this.isSet(gateMap['MAPI ports'], 135)
        this.isCheck(gateMap['DNS'])
        this.isSet(gateMap['DNS ports'], 53)
        this.isCheck(gateMap['Comfort Clients'])
        this.isSet(gateMap['Interval(seconds)'], 1)
        this.isSet(gateMap['Amount(bytes)'], 2)
        this.isCheck(gateMap['Block Oversized File/Email'])
        this.isSet(gateMap['Threshold(MB)'], 10)
        this.isCheck(gateMap['Chunked Bypass'])
        this.isCheck(gateMap['Add Fortinet Bar'])
        this.isSet(gateMap['Communication Port'], 400)
        this.isCheck(gateMap['Allow Fragmented Messages'])
        this.isCheck(gateMap['Append Signature (SMTP)'])
        this.isSet(gateMap['Email Signature Text'], "Email Signature Text test")
    }
})

new Testcase({
    name: 'proxy options clean',
    testcase() {
        this.click(cloudMap['Proxy Options'])

        this.uncheck(cloudMap['All Checkbox'])

        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['Proxy Options'])
        this.isUncheck(gateMap['Log Oversized Files'])
        this.isUncheck(gateMap['RPC over HTTP'])
        this.isUncheck(gateMap['HTTP'])
        this.isUncheck(gateMap['SMTP'])
        this.isUncheck(gateMap['POP3'])
        this.isUncheck(gateMap['IMAP'])
        this.isUncheck(gateMap['FTP'])
        this.isUncheck(gateMap['NNTP'])
        this.isUncheck(gateMap['MAPI'])
        this.isUncheck(gateMap['DNS'])
        this.isUncheck(gateMap['Comfort Clients'])
        this.isUncheck(gateMap['Block Oversized File/Email'])
        this.isUncheck(gateMap['Chunked Bypass'])
        this.isUncheck(gateMap['Add Fortinet Bar'])
        this.isUncheck(gateMap['Allow Fragmented Messages'])
        this.isUncheck(gateMap['Append Signature (SMTP)'])
    }
})