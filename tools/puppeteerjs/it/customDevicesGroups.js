let Testcase = require('../src/testcase.js');

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
    'YES': "div.gwt-PopupPanel button:contains('YES')"
}

let gateMap = {
    'Alias': "input#alias",
    'MAC Address': "input#mac",
    'Comments': "textarea#comment",

    'Custom Devices & Groups': "a[ng-href='page/p/user/device_group/']",
    'device one': "tr[mkey='device one']",

    'Name': "input#name",
    'Members All': "span.entry-value>span:contains('All')",
    'Comments': "textarea#comment",

    'device group one': "tr[mkey='device group one']",
}

new Testcase({
    name: 'device new',
    testcase() {
        this.click(cloudMap['Custom Devices & Groups'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Device'])

        this.set(cloudMap['Alias'], 'device one')
        this.set(cloudMap['MAC Address'], '11:22:33:44:55:67')
        this.set(cloudMap['Comments'], "test Comments")

        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['Alias'], "device one")
        this.isSet(gateMap['MAC Address'], "11:22:33:44:55:67")
        this.isSet(gateMap['Comments'], "test Comments")
    }
})

new Testcase({
    name: 'device delete',
    testcase() {
        this.click(cloudMap['Custom Devices & Groups'])
        this.click(cloudMap['Delete device one'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Custom Devices & Groups'])
        this.isDelete(gateMap['device one'])
    }
})

new Testcase({
    name: 'device group new',
    testcase() {
        this.click(cloudMap['Custom Devices & Groups'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Device Group'])

        this.set(cloudMap['Name'], 'device group one')
        this.click(cloudMap['Members'])
        this.click(cloudMap['All'])
        // this.hide(cloudMap['Members Panel'])

        this.set(cloudMap['Comments'], "test Comments")

        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['Name'], "device group one")
        this.has(gateMap['Members All'])
        this.isSet(gateMap['Comments'], "test Comments")
    }
})

new Testcase({
    name: 'device group delete',
    testcase() {
        this.click(cloudMap['Custom Devices & Groups'])
        this.click(cloudMap['Delete device group one'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Custom Devices & Groups'])
        this.isDelete(gateMap['device group one'])
    }
})