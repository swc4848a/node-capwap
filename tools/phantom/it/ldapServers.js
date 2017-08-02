let Testcase = require('../testcase.js');

let cloudMap = {
    'LDAP Servers': "div.gwt-HTML:contains('LDAP Servers')",
    'Create New': "button:contains('Create New')",

    'Name': "input.gwt-TextBox:eq(0)",
    'Server IP/Name': "input.gwt-TextBox:eq(1)",
    'Server Port': "input.gwt-TextBox:eq(2)",
    'Common Name Identifier': "input.gwt-TextBox:eq(3)",
    'Distinguished Name': "input.gwt-TextBox:eq(4)",
    'Secure Connection': "input:checkbox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
    'Delete server one': "div[title='Delete']:eq(0)",
    'YES': "div.gwt-PopupPanel button:contains('YES')"
}

let gateMap = {
    'LDAP Servers': "a[ng-href='page/p/user/ldap/']",
    'Name': "input[ng-model='$ctrl.ldapServer.name']",
    'Server IP/Name': "input[ng-model='$ctrl.ldapServer.server']",
    'Server Port': "input[ng-model='$ctrl.ldapServer.port']",
    'Common Name Identifier': "input[ng-model='$ctrl.ldapServer.cnid']",
    'Distinguished Name': "input[ng-model='$ctrl.ldapServer.dn']",
    'Secure Connection': "input#secure-connection",
    'Protocol': "",
    'Certificate': "",

    'server one': "tr[mkey='server one']",
}

new Testcase({
    name: 'ldap server new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('LDAP Servers')
        c.click('Create New')

        c.set('Name', "server one")
        c.set('Server IP/Name', "3.3.3.3")
        c.set('Server Port', 100)
        c.set('Common Name Identifier', "ldap id")
        c.set('Distinguished Name', "ldap dis")
        c.checked('Secure Connection')

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/user/ldap/edit/server%2520one')
        g.isSet('Name', "server one")
        g.isSet('Server IP/Name', "3.3.3.3")
        g.isSet('Server Port', 100)
        g.isSet('Common Name Identifier', "ldap id")
        g.isSet('Distinguished Name', "ldap dis")
        g.isChecked('Secure Connection')
    }
})

new Testcase({
    name: 'ldap server delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('LDAP Servers')
        c.click('Delete server one')
        c.click('YES')

    },
    verify: (g) => {
        g.click('LDAP Servers')
        g.isDelete('server one')
    }
})