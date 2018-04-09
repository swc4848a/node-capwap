let Testcase = require('../../src/testcase.js');

let serviceName="Service_test_one"
let serviceGroupName="ServiceGroup_test_one"
let categoryName="category_test_one"

let cloudMap = {

    'PolicyAndObjects': "div.second_menu_button_on_n",
    'Services': "div.gwt-HTML:contains('Services')",
    'Create New': "button:contains('Create New')",
    'Create Service': "div.filter_text:contains('Service'):eq(0)",
    'Create Service Group': "div.filter_text:contains('Service'):eq(1)",
    'Create Category': "div.filter_text:contains('Category')",
    'Categories': "button:contains('Categories')",

    'Name': "input.gwt-TextBox:eq(0)",
    'IP/FQDN': "input.gwt-TextBox:eq(1)",
    'Destination Port Low': "input.gwt-TextBox:eq(2)",
    'Destination Port High': "input.gwt-TextBox:eq(3)",
    'Comments': "textarea.gwt-TextArea",
    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Members': "div.gwt-HTML:contains(' - ')",
    'Member HTTP': "div.gwt-HTML:contains('HTTP')",
    'Member FTP': "div.gwt-HTML:contains('FTP')",
    'Popup Panel': "div.gwt-DecoratedPopupPanel",

    'Delete Service One': `td.left:contains('${serviceName}')~td.right div[title='Delete']`,
    'Delete Service Group One': `td.left:contains('${serviceGroupName}')~td.right div[title='Delete']`,
    'Delete Category One': "div.tk-ModalDialog div[title='Delete']",
    'Last Page': "img.gwt-Image:eq(4)",

    'YES': "span:contains('YES')",
    'Apply': "div.tk-ModalDialog button:contains('Apply')",
}

let gateMap = {
    'PolicyAndObjects': "//span[text()='Policy & Objects']",
    'Services': "a[ng-href='page/p/firewall/object/service/']",
    'Service One': "tr[mkey='w service one']",
    'Service Group One': "tr[mkey='group one']",
    'Edit': "button:contains('Edit'):eq(0)",
    'Name': "input#name",
    'IP/FQDN': "input#addr",
    'Destination Port Low': "input.dlow",
    'Destination Port High': "input.dhigh",
    'Comments': "textarea#comment",
    'Members FTP': "div.selected-entry>span:contains('FTP')",
    'Members HTTP': "div.selected-entry>span:contains('HTTP')",

    'Category Settings': "button:contains('Category Settings'):eq(0)",
    'Category Multi Select category one': "select#categories>option[value='category one']",
}

function openServices(self) {
    self.click(gateMap['PolicyAndObjects'])
    self.wait(1000)
    self.click(gateMap['Services'])
    self.wait(1000)
}
new Testcase({
    name: 'service new',
    testcase() {
        this.click(cloudMap['Services'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Service'])
        this.set('#fcld-serviceEditor-name',serviceName)
        this.set('#fcld-serviceEditor-ipFqdn', "1.1.1.1")
        this.evaluate(`FcldUiTest.setUiObjectValue("serviceEditor-category", "General")`)
        //this.evaluate(`FcldUiTest.setUiObjectValue("serviceEditor-protocol", "TCP/UDP/SCTP")`)
        this.set(cloudMap['Destination Port Low'], "111")
        this.set(cloudMap['Destination Port High'], "222")
        this.set('#fcld-serviceEditor-comments', "test comments")
        this.wait(1000)
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        openServices(this)
        this.has(serviceName)
    }
})

new Testcase({
    name: 'service delete',
    testcase() {
        this.click(cloudMap['Services'])
        //this.click(cloudMap['Last Page'])
        this.click(cloudMap['Delete Service One'])
        this.click(cloudMap['YES'])
    },
    verify() {
        openServices(this)
        this.isDelete(serviceName)
    }
})

new Testcase({
    name: 'service group new',
    testcase() {
        this.click(cloudMap['Services'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Service Group'])
        this.set('#fcld-serviceGroupEditor-name', serviceGroupName)
        this.evaluate(`FcldUiTest.setUiObjectValue("serviceGroupEditor-member", ["HTTP","AFS3"])`)
        // this.click(cloudMap['Members'])
        // this.click(cloudMap['Member HTTP'])
        // this.click(cloudMap['Member FTP'])
        // this.click(cloudMap['Popup Panel'])
        this.set('#fcld-serviceGroupEditor-comments', "test comments")
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        openServices(this)
        this.has(serviceGroupName)
    }
})

new Testcase({
    name: 'service group delete',
    testcase() {
        this.click(cloudMap['Services'])
        this.click(cloudMap['Last Page'])
        this.click(cloudMap['Delete Service Group One'])
        this.click(cloudMap['YES'])
    },
    verify() {
        openServices(this)
        this.isDelete(serviceGroupName)
    }
})


// Test schedule:, create first, then delete
// if many categories exist, delete one item  maybe throw exception, because gwt framework.

new Testcase({
    name: 'category new',
    testcase() {
        this.click(cloudMap['PolicyAndObjects'])
        this.click(cloudMap['Services'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Category'])
        this.set('#fcld-serviceCategoryEditor-name', categoryName)
        this.set('#fcld-serviceCategoryEditor-comments', "test comments")
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(gateMap['Services'])
        this.click(gateMap['Category Settings'])
        this.has(categoryName)
    }
})

new Testcase({
    name: 'category delete',
    testcase() {
        this.click(cloudMap['PolicyAndObjects'])
        this.click(cloudMap['Services'])
        this.click(cloudMap['Categories'])
        this.click(cloudMap['Delete Category One'])
        this.click(cloudMap['Apply'])
    },
    verify() {
        openServices(this)
        this.wait(1000)
        this.click(gateMap['Category Settings'])
        this.isDelete(categoryName)
    }
})