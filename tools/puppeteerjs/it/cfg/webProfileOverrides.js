let Testcase = require('../../src/testcase.js');
/**
 * Editor: utmWebProfileEditor
 * Key/Id: both
		"scope",
		"user",
		"userGroup",
		"ip",
		"oldProfile",
		"newProfile",
		"expires"
 */

 let apiData = {
        "scope" : "User",
        "user" : "guest",
        "userGroup" : "Guest-group",
        "ip" : "172.16.8.8",
        // choose default profile is OK
        // "oldProfile" : "monitor-all",
        // "newProfile" : "default",
        "expires" : "2019-02-05 11:12"
};

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
    'Security Profiles': "//span[text()='Security Profiles']",
    'Web Profile Overrides': "a[ng-href='page/p/utm/wf/override/']",

    'a.com': "tr[mkey='a.com']"
}

new Testcase({
    name: `Web Profile Overrides User New`,
    testcase() {
        this.click(`div:contains("User & Device")`)
        this.click(`div:contains("Users & Groups")`)
        this.wait(1000)
        this.click(`button:contains("Create New")`)
        this.wait(1000)
        this.click(`div.filter_text:contains("User"):eq(0)`)
        this.wait(1000)
        this.set(`input#fcld-userUserEditor-name`, `guest`)
        this.set(`input#fcld-userUserEditor-passwd`, `12345678`)
        this.set(`input#fcld-userUserEditor-emailTo`, `guest@fortinet.com`)
        this.click(`button:contains("Save")`)
    }
})

new Testcase({
    name: 'Web Profile Overrides New',
    testcase() {
        this.click(cloudMap['Web Profile Overrides'])
        this.wait(1000)
        this.click(cloudMap['Create New'])
        this.wait(1000)
        this.readApiData('utmWebProfileEditor', apiData);
        this.click('#fcld-utmWebProfileEditor-save')
        this.click(cloudMap['OK'])
    },
    // do nothing, fos hide this page now
})

new Testcase({
    name: 'Web Profile Overrides Delete',
    testcase() {
        this.click(cloudMap['Web Profile Overrides'])
        this.wait(1000)
        
        this.click(cloudMap['Delete'])
        this.click(cloudMap['YES'])
    },
    // do nothing, fos hide this page now
})

new Testcase({
    name: `Web Profile Overrides User Delete`,
    testcase() {
        this.click(`div:contains("User & Device")`)
        this.click(`div:contains("Users & Groups")`)
        this.wait(1000)
        this.click(`td.left:contains("guest")~td.right div[title="Delete"]`)
        this.wait(1000)
        this.click(`span:contains(YES)`)
    }
})

// // todo: due to click trigger two json new operation, so temporary can't working if deploy, duplicate id