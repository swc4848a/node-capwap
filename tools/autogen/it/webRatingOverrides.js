let Testcase = require('../testcase.js');

let map = {
    'Web Rating Overrides': "div.gwt-HTML:contains('Web Rating Overrides')",

    'Create New': "button[title='Create New']",
    'URL': "input.gwt-TextBox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",
}

new Testcase('web rating overrides new', map, (t) => {
    t.click('Web Rating Overrides')

    t.click('Create New')
    t.set('URL', "a.com")

    t.click('Save')
    t.click('OK')
})