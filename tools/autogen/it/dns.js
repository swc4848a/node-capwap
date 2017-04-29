let Testcase = require('../testcase.js');

let cloudMap = {
    'DNS': "div.gwt-HTML:contains('DNS'):eq(0)",
    'Use FortiGuard Servers': "input[type='radio']:eq(0)~label",
    'Specify': "input[type='radio']:eq(1)~label",
    'Primary DNS Server': "input.gwt-TextBox:eq(0)",
    'Secondary DNS Server': "input.gwt-TextBox:eq(1)",
    'Local Domain Name': "input.gwt-TextBox:eq(2)",
    'Save': "span:contains('Save')",
}

let gateMap = {
    'DNS': "a[ng-href='page/p/system/dns/']",
    'Use FortiGuard Servers': "input#type_fortiguard",
    'Specify': "input#type_specify",
    'Primary DNS Server': "input#primary",
    'Secondary DNS Server': "input#secondary",
    'Local Domain Name': "input#domain",
}

new Testcase({
    name: 'dns edit specify',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('DNS')
        c.click('Specify')
        c.set('Primary DNS Server', "1.1.1.1")
        c.set('Secondary DNS Server', "2.2.2.2")
        c.set('Local Domain Name', "test domain")
        c.click('Save')
    },
    verify: (g) => {
        g.click('DNS')
        g.isChecked('Specify')
        g.isSet('Primary DNS Server', "1.1.1.1")
        g.isSet('Secondary DNS Server', "2.2.2.2")
        g.isSet('Local Domain Name', "test domain")
    }
})

new Testcase({
    name: 'dns edit use fortigurad',
    cloud: cloudMap,
    gate: gateMap,
    testcase: function(c) {
        c.click('DNS')
        c.click('Use FortiGuard Servers')
        c.set('Local Domain Name', "test domain")
        c.click('Save')
    },
    verify: function(g) {
        g.click('DNS')
        g.isChecked('Use FortiGuard Servers')
        g.isSet('Local Domain Name', "test domain")
    }
})
