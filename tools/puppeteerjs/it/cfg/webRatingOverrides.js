let Testcase = require('../../src/testcase.js');

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
    name: 'Web Rating Overrides edit',
    testcase() {
        this.click(cloudMap['Web Rating Overrides'])

        this.click(cloudMap['Create New'])
        this.set(cloudMap['URL'], "a.com")

        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(gateMap['Web Rating Overrides'])
        this.has(gateMap['a.com'])
    }
})

new Testcase({
    name: 'Web Rating Overrides delete',
    testcase() {
        this.click(cloudMap['Web Rating Overrides'])

        this.click(cloudMap['Delete'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Web Rating Overrides'])
        this.isDelete(gateMap['a.com'])
    }
})