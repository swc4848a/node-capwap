let Testcase = require('../testcase.js');

let cloudMap = {
    'Web Profile Overrides': "div.gwt-HTML:contains('Web Profile Overrides')",
    'Create New': "button:contains('Create New')",

    'Scope Range User': "label:contains('User'):eq(0)",
    'Scope Range User Group': "label:contains('User'):eq(1)",
    'Scope Range IP': "label:contains('IP')",
    'Calendar': "img.html-link",
    'Select': "div.gwt-PopupPanel button:contains('Select')",
    'Select Minutes': "select.gwt-ListBox:eq(1)",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete': "div[title='Delete']",
    'YES': "button:contains('YES')",
}

let gateMap = {
    'Web Profile Overrides': "a[ng-href='page/p/utm/wf/override/']",

    'a.com': "tr[mkey='a.com']"
}

new Testcase({
    name: 'template: Web Profile Overrides edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Profile Overrides')
        c.click('Create New')

        c.click('Scope Range User')
        c.click('Calendar')
        c.set('Select Minutes', "59")
        c.click('Select')

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Web Profile Overrides')

    }
})

new Testcase({
    name: 'template: Web Profile Overrides delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Web Profile Overrides')

        c.click('Delete')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Web Profile Overrides')

    }
})

// // todo: due to click trigger two json new operation, so temporary can't working if deploy, duplicate id