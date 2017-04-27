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
    'Interval (seconds)': "input:text:eq(90)",
    'Amount (bytes)': "input:text:eq(91)",
    'Block Oversized File/Email': "input:checkbox:eq(11)",
    'Threshold (MB)': "input:text:eq(94)",
    'Enable Chunked Bypass': "input:checkbox:eq(12)",
    'Add Fortinet Bar': "input:checkbox:eq(13)",
    'Communication Port': "input:text:eq(99)",
    'Allow Fragmented Messages': "input:checkbox:eq(14)",
    'Append Signature (SMTP)': "input:checkbox:eq(15)",

    'All Any': "label:contains('Any')",

    'Save': "span:contains('Save')",
}

cases['proxy options edit'] = [];
cases['proxy options port mapping any'] = [];

let current_case;

let click = (btn) => {
    cases[current_case].push([cloud_map[btn], undefined])
}

let checked = (btn) => {
    if (cloud_map[btn]) {
        cases[current_case].push([cloud_map[btn], true])
    }
}

let set = (btn, val) => {
    if (cloud_map[btn]) {
        cases[current_case].push([cloud_map[btn], val]);
    }
}

(() => {
    current_case = 'proxy options edit';

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
    set('Interval (seconds)', 100);
    set('Amount (bytes)', 110);
    
    checked('Block Oversized File/Email');
    set('Threshold (MB)', 10);

    checked('Enable Chunked Bypass');
    checked('Add Fortinet Bar');
    set('Communication Port', 120)

    checked('Allow Fragmented Messages');
    checked('Append Signature (SMTP)');

    click('Save');
})();

(() => {
    current_case = 'proxy options port mapping any';

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
    click('All Any');

    checked('Comfort Clients');
    set('Interval (seconds)', 100);
    set('Amount (bytes)', 110);
    
    checked('Block Oversized File/Email');
    set('Threshold (MB)', 10);

    checked('Enable Chunked Bypass');
    checked('Add Fortinet Bar');
    set('Communication Port', 120)

    checked('Allow Fragmented Messages');
    checked('Append Signature (SMTP)');

    click('Save');
})();

module.exports = cases;
