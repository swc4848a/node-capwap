let Testcase = require('../src/testcase.js');

let cloudMap = {
    'Addresses': "div.gwt-HTML:contains('Addresses')",
    'Create New': "button:contains('Create New')",
    'Create Address': "div.filter_text:contains('Address'):eq(0)",
    'Name': "input.gwt-TextBox:eq(0)",
    'IP/Netmask': "input.gwt-TextBox:eq(1)",
    'Visibility': "input:checkbox:eq(0)",
    'Static Route': "input:checkbox:eq(1)",
    'Comments': "textarea.gwt-TextArea",
    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete for address new': "td.left:contains('address new')~td.right div[title='Delete']",
    'Delete for group new': "td.left:contains('group new')~td.right div[title='Delete']",
    'Next Page': "img.gwt-Image:eq(3)",
    'YES': "span:contains('YES')",

    'Create Address Group': "div.filter_text:contains('Address'):eq(1)",
    'Members': "div.gwt-HTML:contains(' - ')",
    'all': "div.gwt-HTML:contains('all'):eq(0)",
    'Popup Pannel': "div.gwt-DecoratedPopupPanel",
}

let gateMap = {
    'Name': "input#name",
    'IP/Netmask': "input#ipmask",
    'Visibility': "input#visibility",
    'Static Route': "input#allow-routing",
    'Comments': "textarea#comment",

    'address table': "div.first-cell span",
    'address new': "//span[text()='address new']",
    'group new': "tr[mkey='group new']",
    'Edit': "button span:contains('Edit'):eq(0)",

    'Policy & Objects': "//span[text()='Policy & Objects']",
    'Addresses': "a[href='firewall/address']",
    'Edit': "//span[text()='Edit']",
}

new Testcase({
    name: 'address new',
    testcase() {
        this.click(cloudMap['Addresses'])
        this.click(cloudMap['Create New'])
        this.click(cloudMap['Create Address'])
        this.set(cloudMap['Name'], "address new")
        this.set(cloudMap['IP/Netmask'], "192.168.100.100/255.255.255.0")
        this.checked(cloudMap['Visibility'])
        this.checked(cloudMap['Static Route'])
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
        this.wait(1000)
        this.click(cloudMap['OK'])
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.click(gateMap['Addresses'])
        this.wait(3000)
        this.click(gateMap['address new'])
        this.click(gateMap['Edit'])
        this.wait(3000)
        this.isSet(gateMap['Name'], "address new")
        this.isSet(gateMap['IP/Netmask'], "192.168.100.0/255.255.255.0")
        this.isChecked(gateMap['Visibility'])
        this.isChecked(gateMap['Static Route'])
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'address delete',
    testcase() {
        this.click(cloudMap['Addresses'])
        this.wait(1000)
        this.click(cloudMap['Delete for address new'])
        this.click(cloudMap['YES'])
    },
    verify() {
        this.click(gateMap['Policy & Objects'])
        this.click(gateMap['Addresses'])
        this.wait(3000)
        this.isDelete('address new')
    }
})