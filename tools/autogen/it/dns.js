let Testcase = require('../testcase.js');

let map = {
    'DNS': "div.gwt-HTML:contains('DNS'):eq(0)",
    'Use FortiGuard Servers': "input[type='radio']:eq(0)~label",
    'Specify': "input[type='radio']:eq(1)~label",
    'Primary DNS Server': "input.gwt-TextBox:eq(0)",
    'Secondary DNS Server': "input.gwt-TextBox:eq(1)",
    'Local Domain Name': "input.gwt-TextBox:eq(2)",
    'Save': "span:contains('Save')",
}

new Testcase('dns edit specify', map, (t) => {
    t.click('DNS')
    t.click('Specify')
    t.set('Primary DNS Server', "1.1.1.1")
    t.set('Secondary DNS Server', "2.2.2.2")
    t.set('Local Domain Name', "test domain")
    t.click('Save')
})

new Testcase('dns edit use fortigurad', map, (t) => {
    t.click('DNS')
    t.click('Use FortiGuard Servers')
    t.set('Local Domain Name', "test domain")
    t.click('Save')
})

// // todo: gate gui bug
// cases['dns edit use fortigurad'] = [
//     ["div.gwt-HTML:contains('DNS'):eq(0)", undefined, "a[ng-href='page/p/system/dns/']"],
//     ["input[type='radio']:eq(0)", undefined, "input#type_fortiguard", true],
//     ["input.gwt-TextBox:eq(2)", "test string", "input#domain"],
//     ["span:contains('Save')", undefined, "skip"],
// ];
