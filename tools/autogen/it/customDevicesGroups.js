let Testcase = require('../testcase.js');

let map = {
    'Custom Devices & Groups': "div.gwt-HTML:contains('Custom Devices & Groups')",
    'Create New': "button[title='Create New']",
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
}

new Testcase('device new', map, (t) => {
    t.click('Custom Devices & Groups')
    t.click('Create New')
    t.click('Device')

    t.set('Alias', 'device one')
    t.set('MAC Address', '11:22:33:44:55:67')
    t.set('Comments', "test Comments")

    t.click('Save')
    t.click('OK')
})

new Testcase('device group new', map, (t) => {
    t.click('Custom Devices & Groups')
    t.click('Create New')
    t.click('Device Group')

    t.set('Name', 'device group one')
    t.click('Members')
    t.click('All')
    t.hide('Members Panel')

    t.set('Comments', "test Comments")

    t.click('Save')
    t.click('OK')
})