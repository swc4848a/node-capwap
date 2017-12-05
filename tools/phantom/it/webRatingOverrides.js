let Testcase = require('../testcase.js');

let cloudMap = {
    'Web Rating Overrides': "div.gwt-HTML:contains('Web Rating Overrides')",

    'Create New': "button:contains('Create New')",
    'URL': "input.gwt-TextBox",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete': "div[title='Delete']",
    'YES': "button:contains('YES')",
}

let gateMap = {
    'Web Rating Overrides': "a[ng-href='page/p/utm/wf/local_rating/']",

    'a.com': "tr[mkey='a.com']"
}

new Testcase({
    name: 'template: Web Rating Overrides edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Rating Overrides')

        c.click('Create New')
        c.set('URL', "a.com")

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Web Rating Overrides')

        g.has('a.com')
    }
})

new Testcase({
    name: 'template: Web Rating Overrides delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Rating Overrides')

        c.click('Delete')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Web Rating Overrides')

        g.isDelete('a.com')
    }
})