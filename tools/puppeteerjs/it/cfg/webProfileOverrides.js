let Testcase = require('../../src/testcase.js');

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
    name: 'Web Profile Overrides edit',
    testcase() {
        this.click(cloudMap['Web Profile Overrides'])
        this.click(cloudMap['Create New'])

        this.click(cloudMap['Scope Range User'])
        this.click(cloudMap['Calendar'])
        this.set(cloudMap['Select Minutes'], "59")
        this.click(cloudMap['Select'])

        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(gateMap['Web Profile Overrides'])

    }
})

new Testcase({
    name: 'Web Profile Overrides delete',
    testcase() {
        this.click(cloudMap['Web Profile Overrides'])

        this.click(cloudMap['Delete'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Web Profile Overrides'])
    }
})

// // todo: due to click trigger two json new operation, so temporary can't working if deploy, duplicate id