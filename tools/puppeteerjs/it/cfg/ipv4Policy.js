let Testcase = require('../../src/testcase.js');

let policyName="policy_test"
let cloudMap = {
    'IPv4 Policy': "div.gwt-HTML:contains('IPv4 Policy'):eq(0)",
    'Create New': "button:contains('Create New')",
    'Delete Last Item': `td.left:contains('${policyName}') ~td.right div[title='Delete']:last()`,
    'Save': "span:contains('Save')",
    'YES': "span:contains('YES')"
}

let gateMap = {
    'Policy & Objects': "//span[text()='Policy & Objects']",
    'IPv4 Policy': "//span[text()='IPv4 Policy']"
}

function openIPV4Policy(self) {
    self.click(gateMap['Policy & Objects'])
    self.wait(1000)
    self.click("//span[text()='IPv4 Policy']")
    self.wait(1000)
}


new Testcase({
    name: 'IPV4_policy new',
    testcase() {
        this.click(cloudMap['IPv4 Policy'])
        this.wait(1000)
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
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-ippool", "Use Outgoing Interface Address")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-logtraffic", "All Sessions")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-logtrafficEnable", "false")`)
        this.set('#fcld-policyEditor-comments', "test comments")
        this.click('#fcld-policyEditor-save')
    },
    verify() {
        openIPV4Policy(this)
        this.wait(10000)
        this.has(policyName)
    }
})



new Testcase({
    name: 'IPV4_policy delete',
    testcase() {
        this.wait(1000)
        this.click(cloudMap['IPv4 Policy'])
        this.wait(1000)
        this.click(cloudMap['Delete Last Item'])
        this.wait(2000)
        this.click(cloudMap['YES'])
    },
    verify() {
        openIPV4Policy(this)
        this.isDelete(policyName)
    }
})
