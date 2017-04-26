let Testcase = require('../testcase.js');

let map = {
    'SSL Inspection': "div.gwt-HTML:contains('SSL Inspection')",



    'Save': "span:contains('Save')",
}

let build = (t) => {
    t.click('SSL Inspection')
    t.click('Save')
}

new Testcase('ssl inspection edit', map, build)
