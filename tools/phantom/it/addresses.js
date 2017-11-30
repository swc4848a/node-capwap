let Testcase = require('../testcase.js');

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
    'Addresses': "a[ng-href='firewall/address']",
    'Name': "input#name",
    'IP/Netmask': "input#ipmask",
    'Visibility': "input#visibility",
    'Static Route': "input#allow-routing",
    'Comments': "textarea#comment",

    'address new': "tr[mkey='address new']",
    'group new': "tr[mkey='group new']",
    'Edit': "button span:contains('Edit'):eq(0)",
}

new Testcase({
    name: 'template: address new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Addresses')
        c.click('Create New')
        c.click('Create Address')
        c.set('Name', "address new")
        c.set('IP/Netmask', "192.168.100.100/255.255.255.0")
        c.checked('Visibility')
        c.checked('Static Route')
        c.set('Comments', "test comments")
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/firewall/object/address/edit/address%20new/')
        g.isSet('Name', "address new")
        g.isSet('IP/Netmask', "192.168.100.0/255.255.255.0")
        g.isChecked('Visibility')
        g.isChecked('Static Route')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'template: address delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Addresses')
        c.click('Delete for address new')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Addresses')
        g.isDelete('address new')
    }
})

new Testcase({
    name: 'template: address group new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Addresses')
        c.click('Create New')
        c.click('Create Address Group')
        c.set('Name', "group new")
        c.click('Members')
        c.click('all')
        c.hide('Popup Pannel')
        c.checked('Visibility')
        c.checked('Static Route')
        c.set('Comments', "test comments")
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/firewall/object/address_group/edit/group%20new')
        g.isSet('Name', "group new")
        g.isChecked('Visibility')
        g.isChecked('Static Route')
        g.isSet('Comments', "test comments")
        g.click('Save')
        g.click('OK')
    }
})

new Testcase({
    name: 'template: address group delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Addresses')
        c.click('Next Page')
        c.click('Delete for group new')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Addresses')
        g.isDelete('group new')
    }
})
