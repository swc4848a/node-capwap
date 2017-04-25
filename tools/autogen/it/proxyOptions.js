let cases = require('./root.js');

let cloud_map = {
    'Proxy Options': "div.gwt-HTML:contains('Proxy Options')",

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

    'Block Oversized File/Email': "input:checkbox:eq(11)",

    'Enable Chunked Bypass': "input:checkbox:eq(12)",
    'Add Fortinet Bar': "input:checkbox:eq(13)",

    'Allow Fragmented Messages': "input:checkbox:eq(14)",
    'Append Signature (SMTP)': "input:checkbox:eq(15)",

    'Save': "span:contains('Save')",
}

cases['proxy options edit'] = [];

let click = (btn) => {
    cases['proxy options edit'].push([cloud_map[btn], undefined])
}

let checked = (btn) => {
    if (cloud_map[btn]) {
        cases['proxy options edit'].push([cloud_map[btn], true])
    }
}

(() => {
    click('Proxy Options');

    checked('Log Oversized Files');
    checked('RPC over HTTP');
    checked('HTTP');
    checked('SMTP');
    checked('POP3');
    checked('IMAP');
    checked('FTP');
    checked('NNTP');
    checked('MAPI');
    checked('DNS');

    checked('Comfort Clients');
    checked('Block Oversized File/Email');

    checked('Enable Chunked Bypass');
    checked('Add Fortinet Bar');

    checked('Allow Fragmented Messages');
    checked('Append Signature (SMTP)');

    click('Save');
})()

// delete cases['proxy options edit'];

module.exports = cases;
