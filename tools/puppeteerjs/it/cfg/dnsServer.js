let Testcase = require('../../src/testcase.js');


//interface
let interfaceName = "wan"

//server
let masterDomain = "dns_master_test"
let masterZone = "master_zone"
let slaveDomain = "dns_slave_test"
let slaveZone = "slave_zone"

let cloudMap = {
    'DNS Servers': "div.gwt-HTML:contains('DNS Servers'):eq(0)",
    'Interface Create New': "button:contains('Create New'):eq(0)",
    'Interface delete': `td.left:contains('${interfaceName}')~td.right div[title='Delete']:eq(0)`,
    'Database Create New': "button:contains('Create New'):eq(1)",
    'Database_master delete': `td.left:contains('${masterDomain}')~td.right div[title='Delete']:eq(0)`,
    'Database_slave delete': `td.left:contains('${slaveDomain}')~td.right div[title='Delete']:eq(0)`,
    'YES': "span:contains('YES')",
    'Save': "span:contains('Save')",
}

let gateMap = {
    'Network': "//span[text()='Network']",
    'DNSServers': "a[ng-href='network/dns']",
    'Use FortiGuard Servers': "input#type_fortiguard",
    'Specify': "input#type_specify",
    'Primary DNS Server': "input#primary",
    'Secondary DNS Server': "input#secondary",
    'Local Domain Name': "input#domain",
}


function openDNSServer(self) {
    self.click(gateMap['Network'])
    self.wait(1000)
    self.click(gateMap['DNSServers'])
    self.wait(1000)
}

new Testcase({
    name: 'dns_server_interface new',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['DNS Servers'])
        this.click(cloudMap['Interface Create New'])

        this.evaluate(`FcldUiTest.setUiObjectValue("dnsServiceEditor-intfCombo", "${interfaceName}")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("dnsServiceEditor-modeCombo", "NON_RECURSIVE")`)
        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openDNSServer(this)
        this.has(interfaceName)
        // this.click(gateMap['DNS Servers'])
        // this.isCheck(gateMap['Use FortiGuard Servers'])
        // this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        // this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
        // this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})

new Testcase({
    name: 'dns_server_interface delete',
    testcase() {
        this.wait(1000)
        this.click(cloudMap['DNS Servers'])
        this.click(cloudMap['Interface delete'])
        this.wait(1000)
        this.click(cloudMap['YES'])
    },
    verify() {
        openDNSServer(this)
        this.isDelete(interfaceName, `div.qlist-table`)
        // this.click(gateMap['DNS Servers'])
        // this.isCheck(gateMap['Use FortiGuard Servers'])
        // this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        // this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
        // this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})


new Testcase({
    name: 'dns_database_master new',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['DNS Servers'])
        this.click(cloudMap['Database Create New'])

        this.evaluate(`FcldUiTest.setUiObjectValue("dnsDatabaseEditor-type", "Master")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("dnsDatabaseEditor-view", "Public")`)
        this.set('#fcld-dnsDatabaseEditor-dnsZoneTextBox', masterZone)
        this.set('#fcld-dnsDatabaseEditor-domainNameTextBox', masterDomain)
        this.set('#fcld-dnsDatabaseEditor-hostnameTextBox', "hostname1")
        this.set('#fcld-dnsDatabaseEditor-contactEmailTextBox', "abcd@fortinet.com")
        this.set('#fcld-dnsDatabaseEditor-ttlTextBox', "80000")
        this.evaluate(`FcldUiTest.setUiObjectValue("dnsServiceEditor-authoritativeCombox", "Enable")`)

        this.wait(3000)
        this.click(cloudMap['Save'])
        //It's bug, test case trigger two requests, so it's necessary to click yes,
        //when bug fixed, remove this clause.
        this.wait(cloudMap['YES'])
    },
    verify() {
        openDNSServer(this)
        this.has(masterDomain)
        // this.click(gateMap['DNS Servers'])
        // this.isCheck(gateMap['Use FortiGuard Servers'])
        // this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        // this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
        // this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})

new Testcase({
    name: 'dns_database_master delete',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['DNS Servers'])
        this.wait(2000)
        this.click(cloudMap['Database_master delete'])
        this.wait(2000)
        this.click(cloudMap['YES'])
    },
    verify() {
        openDNSServer(this)
        this.isDelete(masterDomain)
        // this.click(gateMap['DNS Servers'])
        // this.isCheck(gateMap['Use FortiGuard Servers'])
        // this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        // this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
        // this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})
new Testcase({
    name: 'dns_database_slave new',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['DNS Servers'])
        this.click(cloudMap['Database Create New'])

        this.evaluate(`FcldUiTest.setUiObjectValue("dnsDatabaseEditor-type", "Slave")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("dnsDatabaseEditor-view", "Shadow")`)
        this.set('#fcld-dnsDatabaseEditor-dnsZoneTextBox', slaveZone)
        this.set('#fcld-dnsDatabaseEditor-domainNameTextBox', slaveDomain)
        this.set('#fcld-dnsDatabaseEditor-ipOfMasterTextBox', "192.168.1.1")
        this.evaluate(`FcldUiTest.setUiObjectValue("dnsServiceEditor-authoritativeCombox", "Enable")`)

        this.wait(2000)
        this.click(cloudMap['Save'])
        //It's bug, test case trigger two requests, so it's necessary to click yes,
        //when bug fixed, remove this clause.
        this.click(cloudMap[`YES`])
    },
    verify() {
        openDNSServer(this)
        this.has(slaveDomain)
        // this.click(gateMap['DNS Servers'])
        // this.isCheck(gateMap['Use FortiGuard Servers'])
        // this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        // this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
        // this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})



new Testcase({
    name: 'dns_database_slave delete',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['DNS Servers'])
        this.wait(2000)
        this.click(cloudMap['Database_slave delete'])
        this.wait(2000)
        this.click(cloudMap['YES'])
    },
    verify() {
        openDNSServer(this)
        this.isDelete(slaveDomain)
        // this.click(gateMap['DNS Servers'])
        // this.isCheck(gateMap['Use FortiGuard Servers'])
        // this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        // this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
        // this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})