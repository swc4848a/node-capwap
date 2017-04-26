let Testcase = require('../testcase.js');

let map = {
    'SSL Inspection': "div.gwt-HTML:contains('SSL Inspection')",



    'Save': "span:contains('Save')",
}

new Testcase('ssl inspection edit', map, (t) => {
    t.click('SSL Inspection')
    t.click('Save')
})
