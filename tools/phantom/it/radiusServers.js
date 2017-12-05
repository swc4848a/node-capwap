let Testcase = require('../testcase.js');

let cloudMap = {
    'RADIUS Servers': "div.gwt-HTML:contains('RADIUS Servers')",
    'Create New': "button:contains('Create New')",

    'Name': "input.gwt-TextBox:eq(0)",
    'Server IP/Name': "input.gwt-TextBox:eq(1)",
    'Server Secret': "input[type='password']:eq(0)",
    'Secondary Server IP/Name': "input.gwt-TextBox:eq(2)",
    'Secondary Server Secret': "input[type='password']:eq(1)",
    'NAS IP / Called Station ID': "input.gwt-TextBox:eq(3)",
    'Include in every User Group': "input:checkbox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete radius one': "div[title='Delete']:eq(0)",
    'YES': "div.gwt-PopupPanel button:contains('YES')"
}

let gateMap = {
    'RADIUS Servers': "a[ng-href='page/p/user/radius/']",
    'Name': "input#name",
    'Primary Server IP/Name': "input#server",
    'Secondary Server IP/Name': "input#secondary-server",
    'Authentication Method': "input:radio[name='auth-type']",
    'NAS IP': "input#nas-ip",
    'Include in every User Group': "input#all-usergroup",

    'radius one': "tr[mkey='radius one']",
}

new Testcase({
    name: 'template: radius server new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('RADIUS Servers')
        c.click('Create New')

        c.set('Name', "radius one")
        c.set('Server IP/Name', "3.3.3.3")
        c.set('Server Secret', "12345678")
        c.set('Secondary Server IP/Name', "6.6.6.6")
        c.set('Secondary Server Secret', "12345678")
        c.set('NAS IP / Called Station ID', "2.2.2.2")
        c.checked('Include in every User Group')

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/user/radius/edit/radius%20one/')
        g.isSet('Name', "radius one")
        g.isSet('Primary Server IP/Name', "3.3.3.3")
        g.isSet('Secondary Server IP/Name', "6.6.6.6")
        g.isSet('Authentication Method', true)
        g.isSet('NAS IP', "2.2.2.2")
        g.isChecked('Include in every User Group')
    }
})

new Testcase({
    name: 'template: radius server delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('RADIUS Servers')
        c.click('Delete radius one')
        c.click('YES')
    },
    verify: (g) => {
        g.click('RADIUS Servers')
        g.isDelete('radius one')
    }
})