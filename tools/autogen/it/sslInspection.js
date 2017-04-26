let Testcase = require('../testcase.js');

let map = {
    'SSL Inspection': "div.gwt-HTML:contains('SSL Inspection')",

    'Comments': "textarea",
    'Multiple Clients Connecting to Multiple Servers': "label:contains('Multiple')",
    'SSL Certificate Inspection': "label:contains('Certificate')",
    'Untrusted SSL Certificates Allow': "label:contains(Allow)",
    'Inspect All Ports': "input:checkbox:eq(1)~label",
    'Allow Invalid SSL Certificates': "input:checkbox:eq(42)~label",
    'Log Invalid Certificates': "input:checkbox:eq(43)~label",

    'Save': "span:contains('Save')",
}

new Testcase('ssl inspection edit', map, (t) => {
    t.click('SSL Inspection')

    t.set('Comments', "test comemnts")
    t.click('Multiple Clients Connecting to Multiple Servers')
    t.click('SSL Certificate Inspection')
    t.click('Untrusted SSL Certificates Allow')
    t.click('Inspect All Ports')
    t.click('Allow Invalid SSL Certificates')
    t.click('Log Invalid Certificates')

    t.click('Save')
})
