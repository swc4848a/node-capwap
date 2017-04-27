let cases = require('./root.js');
let Testcase = require('../testcase.js');

let map = {
    'Authentication Settings': "div.gwt-HTML:contains('Authentication Settings')",

    'Authentication Timeout': "input.gwt-TextBox",
    'Protocol Support All': "input:checkbox",

    'Save': "span:contains('Save')",
}

new Testcase('authentication setttings edit', map, (t) => {
    t.click('Authentication Settings')

    t.set('Authentication Timeout', 11)
    t.checked('Protocol Support All')

    t.click('Save')
})

delete cases['authentication setttings edit'];
