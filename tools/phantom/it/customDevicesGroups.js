let Testcase = require('../testcase.js');

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
    name: 'template: device new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Custom Devices & Groups')
        c.click('Create New')
        c.click('Device')

        c.set('Alias', 'device one')
        c.set('MAC Address', '11:22:33:44:55:67')
        c.set('Comments', "test Comments")

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/user/device/edit/device%20one/?redir=%2Fng%2Fuser%2Fdevice')
        g.isSet('Alias', "device one")
        g.isSet('MAC Address', "11:22:33:44:55:67")
        g.isSet('Comments', "test Comments")
    }
})

new Testcase({
    name: 'template: device delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Custom Devices & Groups')
        c.click('Delete device one')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Custom Devices & Groups')
        g.isDelete('device one')
    }
})

new Testcase({
    name: 'template: device group new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Custom Devices & Groups')
        c.click('Create New')
        c.click('Device Group')

        c.set('Name', 'device group one')
        c.click('Members')
        c.click('All')
        c.hide('Members Panel')

        c.set('Comments', "test Comments")

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/user/device_group/edit/device%20group%20one/')
        g.isSet('Name', "device group one")
        g.has('Members All')
        g.isSet('Comments', "test Comments")
    }
})

new Testcase({
    name: 'template: device group delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Custom Devices & Groups')
        c.click('Delete device group one')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Custom Devices & Groups')
        g.isDelete('device group one')
    }
})