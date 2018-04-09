let Testcase = require('../../src/testcase.js');

let policyName="policy_test"
let cloudMap = {
    'IPv4 Policy': "div.gwt-HTML:contains('IPv4 Policy'):eq(0)",
    'Create New': "button:contains('Create New')",
    'Delete Last Item': `td.left:contains('${policyName}') ~td.right div[title='Delete']:last()`,
    'Save': "span:contains('Save')",

}

let gateMap = {
    'Network': "//span[text()='Network']",
    'IPv4 Policy': "a[ng-href='firewall/policy/policy/standard']",

}

function openIPV4Policy(self) {
    self.click(gateMap['Network'])
    self.wait(1000)
    self.click(gateMap['IPV4 Policy'])
    self.wait(1000)
}


new Testcase({
    name: 'IPV4_policy new',
    testcase() {
        this.click(cloudMap['IPv4 Policy'])
        this.click(cloudMap['Create New'])
        this.wait(1000)

        this.set('#fcld-policyEditor-name', policyName)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-srcintf", ["dmz","internal"])`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-dstintf", ["wan1","wan2"])`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-srcaddr", ["all","none"])`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-dstaddr", ["all","none"])`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-schedule", ["always"])`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-service", ["HTTP","IMAP"])`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-action", "Accept")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-nat", "true")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-fixedport", "true")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-ippool", "Use Dynamic IP Pool")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-logtraffic", "All Sessions")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-logtrafficEnable", "false")`)
        this.set('#fcld-policyEditor-comments', "test comments")

        this.wait(1000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openIPV4Policy(this)
        // this.click(gateMap['DNS'])
        // this.isCheck(gateMap['Specify'])
        // this.isSet(gateMap['Primary DNS Server'], "172.16.100.100")
        // this.isSet(gateMap['Secondary DNS Server'], "172.16.100.80")
        // this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})



new Testcase({
    name: 'IPV4_policy delete',
    testcase() {
        this.wait(1000)
        this.click(cloudMap['IPv4 Policy'])
        this.click(cloudMap['Delete Last Item'])
        this.wait(2000)
        this.click(cloudMap['YES'])
    },
    verify() {
        openIPV4Policy(this)
        this.isDelete(policyName)
        // this.click(gateMap['DNS Servers'])
        // this.isCheck(gateMap['Use FortiGuard Servers'])
        // this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
        // this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
        // this.isSet(gateMap['Local Domain Name'], "test domain")
    }
})
