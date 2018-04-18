let Testcase = require('../../src/testcase.js');

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
    'Network': "//span[text()='Network']",
    'DNS': "a[ng-href='page/p/system/dns/']",
    'Use FortiGuard Servers': "input#type_fortiguard",
    'Specify': "input#type_specify",
    'Primary DNS Server': "input#primary",
    'Secondary DNS Server': "input#secondary",
    'Local Domain Name': "input#domain",
}

let domainName = "test.com"
let secDns = "208.91.112.56"


function openDNS(self) {
    self.click(gateMap['Network'])
    self.wait(500)
    self.click(gateMap['DNS'])
    self.wait(1000)
}


new Testcase({
    name: 'dns edit specify',
    testcase() {
        this.click(cloudMap['DNS'])
        this.wait(3000)
        this.evaluate(`FcldUiTest.setUiObjectValue("dnsEditor-dnsModeGroup", "Specify")`)
        this.set('#fcld-dnsEditor-priDns', "208.91.112.53")
        this.set('#fcld-dnsEditor-secDns', secDns)
        this.set('#fcld-dnsEditor-localDomain', domainName)
        this.click('#fcld-dnsEditor-save')
    },
    verify() {
        openDNS(this)
        this.isCheck(gateMap['Specify'])
        this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        this.isSet(gateMap['Secondary DNS Server'], secDns)
        this.isSet(gateMap['Local Domain Name'], domainName)
    }
})


new Testcase({
    name: 'dns edit use fortiguard',
    testcase() {
        this.wait(1000)
        this.click(cloudMap['DNS'])
        this.wait(3000)
        this.evaluate(`FcldUiTest.setUiObjectValue("dnsEditor-dnsModeGroup", "Use FortiGuard Servers")`)
        this.set('#fcld-dnsEditor-localDomain', '')
        this.click('#fcld-dnsEditor-save')
    },
    verify() {
        openDNS(this)
        this.isCheck(gateMap['Use FortiGuard Servers'], true)
        this.isSet(gateMap['Local Domain Name'], '')
    }
})