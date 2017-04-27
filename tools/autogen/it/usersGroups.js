let cases = require('./root.js');
let Testcase = require('../testcase.js');

let map = {
    'Users & Groups': "div.gwt-HTML:contains('Users & Groups')",
    'Create New': "button[title='Create New']",
    'User': "div.filter_text:contains(User):eq(0)",
    'User Group': "div.filter_text:contains(User):eq(1)",

    'Name': "input.gwt-TextBox:eq(0)",
    'Password': "input[type='password']",
    'Email Address': "input.gwt-TextBox:eq(1)",
    'SMS': "input.gwt-TextBox:eq(2)",
    'Enabled': "input:checkbox",

    'Members': "div.gwt-HTML:contains(' - ')",
    'guest': "div.gwt-DecoratedPopupPanel div.gwt-HTML:contains('guest')",
    'Members Panel': "div.gwt-DecoratedPopupPanel",
    'Remote Groups Add': "div.svg-bg-add",
    'Remote Groups Group Name one': "input.gwt-TextBox:eq(1)",
    'Remote Groups Group Name two': "input.gwt-TextBox:eq(2)",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

new Testcase('user new', map, (t) => {
    t.click('Users & Groups')
    t.click('Create New')
    t.click('User')

    t.set('Name', 'user one')
    t.set('Password', '12345678')
    t.set('Email Address', 'a@qq.com')
    t.set('SMS', '1234567890')
    t.checked('Enabled')

    t.click('Save')
    t.click('OK')
})

new Testcase('user group new', map, (t) => {
    t.click('Users & Groups')
    t.click('Create New')
    t.click('User Group')

    t.set('Name', 'group one')
    t.click('Members')
    t.click('guest')
    t.hide('Members Panel')
    t.click('Remote Groups Add')
    t.set('Remote Groups Group Name one', 'remote groups one')
    t.click('Remote Groups Add')
    t.set('Remote Groups Group Name two', 'remote groups two')

    t.click('Save')
    t.click('OK')
})

delete cases['user new'];
delete cases['user group new'];
