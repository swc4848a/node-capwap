let cases = require('./root.js');
let Testcase = require('../testcase.js');

let map = {
    'LDAP Servers': "div.gwt-HTML:contains('LDAP Servers')",
    'Create New': "button[title='Create New']",

    'Name': "input.gwt-TextBox:eq(0)",
    'Server IP/Name': "input.gwt-TextBox:eq(1)",
    'Server Port': "input.gwt-TextBox:eq(2)",
    'Common Name Identifier': "input.gwt-TextBox:eq(3)",
    'Distinguished Name': "input.gwt-TextBox:eq(4)",
    'Secure Connection': "input:checkbox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

new Testcase('ldap server new', map, (t) => {
    t.click('LDAP Servers')
    t.click('Create New')

    t.set('Name', "server one")
    t.set('Server IP/Name', "3.3.3.3")
    t.set('Server Port', 100)
    t.set('Common Name Identifier', "ldap id")
    t.set('Distinguished Name', "ldap dis")
    t.checked('Secure Connection')

    t.click('Save')
    t.click('OK')
})

delete cases['ldap server new'];
