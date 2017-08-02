let Testcase = require('../testcase.js');

let cloudMap = {
    'Services': "div.gwt-HTML:contains('Services')",
    'Create New': "button:contains('Create New')",
    'Create Service': "div.filter_text:contains('Service'):eq(0)",
    'Create Service Group': "div.filter_text:contains('Service'):eq(1)",
    'Create Category': "div.filter_text:contains('Category')",

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
    'Last Page': "img.gwt-Image:eq(4)",

    'YES': "span:contains('YES')",
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

    'Category Settings': "button:contains('Category Settings')",
    'Category Multi Select category one': "select#categories>option[value='category one']",
}

new Testcase({
    name: 'service new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Services')
        c.click('Create New')
        c.click('Create Service')
        c.set('Name', "w service one")
        c.set('IP/FQDN', "1.1.1.1")
        c.set('Destination Port Low', "111")
        c.set('Destination Port High', "222")
        c.set('Comments', "test comments")
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/firewall/object/service/edit/w%20service%20one/')
        g.isSet('Name', "w service one")
        g.isSet('IP/FQDN', "1.1.1.1")
        g.isSet('Destination Port Low', "111")
        g.isSet('Destination Port High', "222")
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'service delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Services')
        c.click('Last Page')
        c.click('Delete Service One')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Services')
        g.isDelete('Service One')
    }
})

new Testcase({
    name: 'service group new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Services')
        c.click('Create New')
        c.click('Create Service Group')
        c.set('Name', "group one")
        c.click('Members')
        c.click('Member HTTP')
        c.click('Member FTP')
        c.click('Popup Panel')
        c.set('Comments', "test comments")
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/firewall/object/service_group/edit/group%20one/')
        g.isSet('Name', "group one")
        g.has('Members FTP')
        g.has('Members HTTP')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'service group delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Services')
        c.click('Last Page')
        c.click('Delete Service Group One')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Services')
        g.isDelete('Service Group One')
    }
})

new Testcase({
    name: 'category new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Services')
        c.click('Create New')
        c.click('Create Category')
        c.set('Name', "category one")
        c.set('Comments', "test comments")
        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.click('Services')
        g.click('Category Settings')
        g.has('Category Multi Select category one')
    }
})
