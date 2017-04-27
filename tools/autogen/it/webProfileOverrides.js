let cases = require('./root.js');
let Testcase = require('../testcase.js');

let map = {
    'Web Profile Overrides': "div.gwt-HTML:contains('Web Profile Overrides')",
    'Create New': "button[title='Create New']",

    'Scope Range User': "label:contains('User'):eq(0)",
    'Scope Range User Group': "label:contains('User'):eq(1)",
    'Scope Range IP': "label:contains('IP')",
    'Calendar': "img.html-link",
    'Select': "div.gwt-PopupPanel button:contains('Select')",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

new Testcase('web profile overrides new user', map, (t) => {
    t.click('Web Profile Overrides')
    t.click('Create New')

    t.click('Scope Range User')
    t.click('Calendar')
    t.click('Select')

    t.click('Save')
    t.click('OK')
})

// todo: due to click trigger two json new operation, so temporary can't working if deploy, duplicate id
delete cases['web profile overrides new user'];
