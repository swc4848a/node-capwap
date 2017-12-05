let Testcase = require('../testcase.js');

let cloudMap = {
    'IP Pools': "div.gwt-HTML:contains('IP Pools')",
    'Create New': "button:contains('Create New')",

    'Name': "input.gwt-TextBox:eq(0)",
    'Type': "", // todo: can't click
    'External IP Range Start': "input.gwt-TextBox:eq(1)",
    'External IP Range End': "input.gwt-TextBox:eq(2)",
    'ARP Reply': "input:checkbox",
    'Comments': "textarea.gwt-TextArea",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete IpPool One': "td.left:contains('ippool one')~td.right div[title='Delete']",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'IP Pools': "a[href='page/p/firewall/object/ippool/']",

    'Name': "input#name",
    'Type Overload': "input#type-overload",
    'External IP Range Start': "input#startip-ipv4",
    'External IP Range End': "input#endip-ipv4",
    'ARP Reply': "input#arp-reply",
    'Comments': "textarea#comments",

    'ippool one': "tr[mkey='ippool one']",
    'Edit': "button:contains('Edit'):eq(0)",
}

new Testcase({
    name: 'template: ippool new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('IP Pools')
        c.click('Create New')
        c.set('Name', "ippool one")
            // c.click('Type')
        c.set('External IP Range Start', "1.1.1.1")
        c.set('External IP Range End', "1.1.1.1")
        c.checked('ARP Reply')
        c.set('Comments', "test comments")

        c.click('Save')
        c.click('OK')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/firewall/object/ippool/edit/ippool%20one')
        g.isSet('Name', "ippool one")
        g.isChecked('Type Overload')
        g.isSet('External IP Range Start', "1.1.1.1")
        g.isSet('External IP Range End', "1.1.1.1")
        g.isChecked('ARP Reply')
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'template: ippool delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('IP Pools')
        c.click('Delete IpPool One')
        c.click('YES')
    },
    verify: (g) => {
        g.click('IP Pools')
        g.isDelete('ippool one')
    }
})
