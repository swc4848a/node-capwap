let cases = require('./root.js');
let Testcase = require('../testcase.js');

let map = {
    'RADIUS Servers': "div.gwt-HTML:contains('RADIUS Servers')",
    'Create New': "button[title='Create New']",

    'Name': "input.gwt-TextBox:eq(0)",
    'Server IP/Name': "input.gwt-TextBox:eq(1)",
    'Server Secret': "input[type='password']:eq(0)",
    'Secondary Server IP/Name': "input.gwt-TextBox:eq(2)",
    'Secondary Server Secret': "input[type='password']:eq(1)",
    'NAS IP / Called Station ID': "input.gwt-TextBox:eq(3)",
    'Include in every User Group': "input:checkbox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

new Testcase('radius server new', map, (t) => {
    t.click('RADIUS Servers')
    t.click('Create New')

    t.set('Name', "radius one")
    t.set('Server IP/Name', "3.3.3.3")
    t.set('Server Secret', "12345678")
    t.set('Secondary Server IP/Name', "6.6.6.6")
    t.set('Secondary Server Secret', "12345678")
    t.set('NAS IP / Called Station ID', "2.2.2.2")
    t.checked('Include in every User Group')

    t.click('Save')
    t.click('OK')
})

// delete cases['radius server new'];
