let Testcase = require('../../src/testcase.js');

let cloudMap = {
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

    'Delete Service One': "td.left:contains('w service one')~td.right div[title='Delete']",
    'Delete Service Group One': "td.left:contains('group one')~td.right div[title='Delete']",
    'Delete Category One': "div.tk-ModalDialog div[title='Delete']",
    'Last Page': "img.gwt-Image:eq(4)",

    'YES': "span:contains('YES')",
    'Apply': "div.tk-ModalDialog button:contains('Apply')",
}

let gateMap = {
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

new Testcase({
    name: 'service new',
    testcase() {
        this.click(cloudMap['Services'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Service'])
        this.set(cloudMap['Name'], "w service one")
        this.set(cloudMap['IP/FQDN'], "1.1.1.1")
        this.set(cloudMap['Destination Port Low'], "111")
        this.set(cloudMap['Destination Port High'], "222")
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['Name'], "w service one")
        this.isSet(gateMap['IP/FQDN'], "1.1.1.1")
        this.isSet(gateMap['Destination Port Low'], "111")
        this.isSet(gateMap['Destination Port High'], "222")
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'service delete',
    testcase() {
        this.click(cloudMap['Services'])
        this.click(cloudMap['Last Page'])
        this.click(cloudMap['Delete Service One'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Services'])
        this.isDelete(gateMap['Service One'])
    }
})

new Testcase({
    name: 'service group new',
    testcase() {
        this.click(cloudMap['Services'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Service Group'])
        this.set(cloudMap['Name'], "group one")
        this.click(cloudMap['Members'])
        this.click(cloudMap['Member HTTP'])
        this.click(cloudMap['Member FTP'])
        this.click(cloudMap['Popup Panel'])
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.isSet(gateMap['Name'], "group one")
        this.has(gateMap['Members FTP'])
        this.has(gateMap['Members HTTP'])
        this.isSet(gateMap['Comments'], "test comments")
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
        this.click(gateMap['Services'])
        this.isDelete(gateMap['Service Group One'])
    }
})

new Testcase({
    name: 'category new',
    testcase() {
        this.click(cloudMap['Services'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Category'])
        this.set(cloudMap['Name'], "category one")
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(gateMap['Services'])
        this.click(gateMap['Category Settings'])
        this.has(gateMap['Category Multi Select category one'])
    }
})

new Testcase({
    name: 'category delete',
    testcase() {
        this.click(cloudMap['Services'])
        this.click(cloudMap['Categories'])
        this.click(cloudMap['Delete Category One'])
        this.click(cloudMap['Apply'])
    },
    verify() {
        this.click(gateMap['Services'])
        this.click(gateMap['Category Settings'])
        this.isDelete(gateMap['Category Multi Select category one'])
    }
})