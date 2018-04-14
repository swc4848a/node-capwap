let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'Custom Devices & Groups': "div.gwt-HTML:contains('Custom Devices & Groups')",
    'Create New': "button:contains('Create New')",
    'Device': "div.filter_text:contains(Device):eq(0)",
    'Device Group': "div.filter_text:contains(Device):eq(1)",

    'Alias': "input.gwt-TextBox:eq(0)",
    'MAC Address': "input.gwt-TextBox:eq(1)",
    'Comments': "textarea",

    'Name': "input.gwt-TextBox:eq(0)",
    'Members': "div.gwt-HTML:contains(' - ')",
    'All': "div.gwt-DecoratedPopupPanel div.gwt-HTML:contains('All')",
    'Members Panel': "div.gwt-DecoratedPopupPanel",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
    'Delete device one': "div[title='Delete']:eq(0)",
    'Delete device group one': "div[title='Delete']:eq(0)",
    'YES': "button:contains('YES')"
}

let gateMap = {
    'Alias': "input#alias",
    'MAC Address': "input#mac",
    'Comments': "textarea#comment",

    'User & Device': "span:contains('User & Device')",
    'Custom Devices & Groups': "span:contains('Custom Devices & Groups')",
    'Edit': "span:contains('Edit')",
    'device one': "tr[mkey='device one']",

    'Name': "input#name",
    'Members Mac': "span.entry-value>span:contains('Mac')",
    'Comments': "textarea#comment",

    'device group one': `tr[mkey="device group one"]`,
}
/**
 * Editor: userDeviceEditor
 * Key/Id:
 *  i: "alias",
 *  i: "mac",
 *  k: "macPerDevice"
 *  k: "type",
 *  i: "comment".
 */
new Testcase({
    name: 'device new',
    testcase() {
        this.click(cloudMap['Custom Devices & Groups'])
        this.wait(1000)
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Device'])
        this.wait(1000)
        this.set('#fcld-userDeviceEditor-alias', 'device one')
        this.set('#fcld-userDeviceEditor-mac', '11:22:33:44:55:67')
        this.evaluate(`FcldUiTest.setUiObjectValue("userDeviceEditor-type", "Fortinet Device")`)
        this.set('#fcld-userDeviceEditor-comment', "test Comments")
        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(gateMap['User & Device'])
        this.click(gateMap['Custom Devices & Groups'])
        this.wait(1000)
        this.click(gateMap['device one'])
        this.click(gateMap['Edit'])
        this.wait(1000)
        this.isSet(gateMap['Alias'], "device one")
        this.isSet(gateMap['MAC Address'], "11:22:33:44:55:67")
        this.isSet(gateMap['Comments'], "test Comments")
    }
})

new Testcase({
    name: 'device delete',
    testcase() {
        this.click(cloudMap['Custom Devices & Groups'])
        this.wait(1000)
        this.click(cloudMap['Delete device one'])
        this.wait(1000)
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['User & Device'])
        this.click(gateMap['Custom Devices & Groups'])
        this.wait(`div.qlist-table`)
        this.isDelete('device one')
    }
})
/**
 * Editor: userDeviceGroupEditor
 * Key/Id:
 *  i: "name",
 *  k: "member",
 *  k: "comment".
 */
new Testcase({
    name: 'device group new',
    testcase() {
        this.click(cloudMap['Custom Devices & Groups'])
        this.wait(1000)
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Device Group'])
        this.wait(1000)
        this.set('#fcld-userDeviceGroupEditor-name', 'device group one')
        this.evaluate(`FcldUiTest.setUiObjectValue("userDeviceGroupEditor-member", ["Mac"])`)
        this.set('#fcld-userDeviceGroupEditor-comment', "test Comments")
        this.wait(1000)
        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(`span:contains("User & Device")`)
        this.click(`span:contains("Custom Devices & Groups")`)
        this.wait(3000)
        this.click(`//span[text()="device group one"]`)
        this.wait(1000)
        this.click(`button:contains("Edit")`)
        this.wait(3000)
        this.isSet(gateMap['Name'], "device group one")
        this.has('Mac')
        this.isSet(gateMap['Comments'], "test Comments")
    }
})

new Testcase({
    name: 'device group delete',
    testcase() {
        this.click(cloudMap['Custom Devices & Groups'])
        this.wait(1000)
        this.click(cloudMap['Delete device group one'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(`span:contains("User & Device")`)
        this.click(gateMap['Custom Devices & Groups'])
        this.wait(1000)
        this.isDelete('device group one')
    }
})