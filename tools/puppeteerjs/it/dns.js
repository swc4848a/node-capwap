let Testcase = require('../src/testcase.js');

let cloudMap = {
    'DNS': "div.gwt-HTML:contains('DNS'):eq(0)",
    'Use FortiGuard Servers': "input[type='radio']:eq(0)~label",
    'Specify': "label:contains('Specify')",
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
    name: 'dns edit use fortigurad',
    testcase() {
        this.click(cloudMap['DNS'])
        this.set(cloudMap['Primary DNS Server'], "208.91.112.53")
        this.set(cloudMap['Secondary DNS Server'], "208.91.112.52")
        this.click(cloudMap['Use FortiGuard Servers'])
        this.set(cloudMap['Local Domain Name'], "test domain")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['DNS'])
        this.isCheck(gateMap['Use FortiGuard Servers'])
        this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
        this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})

new Testcase({
    name: 'dns edit specify',
    testcase() {
        this.click(cloudMap['DNS'])
        this.click(cloudMap['Specify'])
        this.set(cloudMap['Primary DNS Server'], "172.16.100.100")
        this.set(cloudMap['Secondary DNS Server'], "172.16.100.80")
        this.set(cloudMap['Local Domain Name'], "test domain")
        this.click(cloudMap['Save'])
    },
    verify() {
        this.click(gateMap['DNS'])
        this.isCheck(gateMap['Specify'])
        this.isSet(gateMap['Primary DNS Server'], "172.16.100.100")
        this.isSet(gateMap['Secondary DNS Server'], "172.16.100.80")
        this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})