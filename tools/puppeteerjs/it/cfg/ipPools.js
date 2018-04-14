let Testcase = require('../../src/testcase.js');

let poolName="ippool one"

let cloudMap = {
    'IP Pools': "div.gwt-HTML:contains('IP Pools')",
    'Create New': "button:contains('Create New')",

    'Name': "input.gwt-TextBox:eq(0)",
    'Type': "", // todo: can't click
    'External IP Range Start': "input.gwt-TextBox:eq(1)",
    'External IP Range End': "input.gwt-TextBox:eq(2)",
    'ARP Reply': "input:checkbox",
    'Comments': "textarea.gwt-TextArea",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete IpPool One': `td.left:contains('${poolName}')~td.right div[title='Delete']`,
    'YES': "span:contains('YES')",
}

let gateMap = {
    'PolicyAndObjects': "//span[text()='Policy & Objects']",
    'IP Pools': "a[href='page/p/firewall/object/ippool/']",

    'Name': "input#name",
    'Type Overload': "input#type-overload",
    'External IP Range Start': "input#startip-ipv4",
    'External IP Range End': "input#endip-ipv4",
    'ARP Reply': "input#arp-reply",
    'Comments': "textarea#comments",

    'ippool one': "tr[mkey='ippool one']",
    'Edit': "button:contains('Edit'):eq(0)",
}


function openIPPool(self) {
    self.click(gateMap['PolicyAndObjects'])
    self.wait(1000)
    self.click(gateMap['IP Pools'])
    self.wait(1000)
}
new Testcase({
    name: 'ippool new',
    testcase() {
        this.click(cloudMap['IP Pools'])
        this.click(cloudMap['Create New'])
        this.set('#fcld-ippoolEditor-name', poolName)
        // this.evaluate(`FcldUiTest.setUiObjectValue("ippoolEditor-type", "Overload")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("ippoolEditor-type", "One to One")`)
        this.set('#fcld-ippoolEditor-startIp', "1.1.1.1")
        this.set('#fcld-ippoolEditor-endIp', "1.1.1.1")
        this.evaluate(`FcldUiTest.setUiObjectValue("ippoolEditor-arpReplyCheckBox", "true")`)
        this.set('#fcld-ippoolEditor-comments', "test comments")
        this.click(cloudMap['Save'])
        this.wait(2000)
        this.click(cloudMap['OK'])
    },
    verify() {
        openIPPool(this)
        this.has(poolName)
        // this.isSet(gateMap['Name'], poolName)
        // this.isCheck(gateMap['Type Overload'])
        // this.isSet(gateMap['External IP Range Start'], "1.1.1.1")
        // this.isSet(gateMap['External IP Range End'], "1.1.1.1")
        // this.isCheck(gateMap['ARP Reply'])
        // this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'ippool delete',
    testcase() {
        this.click(cloudMap['IP Pools'])
        this.click(cloudMap['Delete IpPool One'])
        this.click(cloudMap['YES'])
    },
    verify() {
        openIPPool(this)
        this.isDelete(poolName)
    }
})