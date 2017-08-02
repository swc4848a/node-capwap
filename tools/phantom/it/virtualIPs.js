let Testcase = require('../testcase.js');

let cloudMap = {
    'Virtual IPs': "div.gwt-HTML:contains('Virtual IPs')",
    'Create New': "button:contains('Create New')",
    'Create Virtual IP': "div.filter_text:contains('Virtual IP'):eq(0)",
    'Create Virtual IP Group': "div.filter_text:contains('Virtual IP Group')",

    'Name': "input.gwt-TextBox:eq(0)",
    'Interface': "", // todo: can't click
    'External IP Address/Range Start': "input.gwt-TextBox:eq(1)",
    'External IP Address/Range End': "input.gwt-TextBox:eq(2)",
    'Mapped IP Address/Range Start': "input.gwt-TextBox:eq(3)",
    'Mapped IP Address/Range End': "input.gwt-TextBox:eq(4)",
    'Source Address Filter Add': "div.svg-bg-add",
    'Source IP/Range/Subset One': "input.gwt-TextBox:eq(5)",
    'Source IP/Range/Subset Two': "input.gwt-TextBox:eq(6)",
    'Port Forwarding': "input:checkbox",
    'Protocol': "", // todo: can't click
    'External Service Port Start': "input.gwt-TextBox:eq(7)",
    'External Service Port End': "input.gwt-TextBox:eq(8)",
    'Map to Port Start': "input.gwt-TextBox:eq(9)",
    'Map to Port End': "input.gwt-TextBox:eq(10)",
    'Comments': "textarea.gwt-TextArea",

    'Save': "span:contains('Save')",
    'OK': "button:contains('OK')",

    'Delete Virtual IP One': "td.left:contains('virtual ip one')~td.right div[title='Delete']",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Virtual IPs': "a[href='page/p/firewall/object/virtualip/']",

    'Name': "input#name",
    'Interface any': "div.selected-entry:contains('any')",
    'External IP Address/Range Start': "input[data-name='extip1']",
    'External IP Address/Range End': "input[data-name='extip2']",
    'Mapped IP Address/Range Start': "input[data-name='mappedip1']",
    'Mapped IP Address/Range End': "input[data-name='mappedip2']",
    'Source Address Filter Status': "input:checkbox#enable-src-filter",
    'Source IP/Range/Subset One': "input[value='1.1.1.1']",
    'Source IP/Range/Subset Two': "input[value='2.2.2.2']",
    'Port Forwarding': "input:checkbox#portforward",
    'Protocol TCP': "input:checkbox#protocol-tcp",
    'External Service Port Start': "input#extport1",
    'External Service Port End': "input#extport2",
    'Map to Port Start': "input#mappedport1",
    'Map to Port End': "input#mappedport2",
    'Comments': "textarea#comment",

    'Virtual IP One': "tr[mkey='virtual ip one']",
    'Edit': "button:contains('Edit'):eq(0)",
}

new Testcase({
    name: 'virtual ip new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Virtual IPs')
        c.click('Create New')
        c.click('Create Virtual IP')

        c.set('Name', "virtual ip one")

        c.set('External IP Address/Range Start', "1.1.1.1")
        c.set('External IP Address/Range End', "2.2.2.2")
        c.set('Mapped IP Address/Range Start', "3.3.3.3")
        c.set('Mapped IP Address/Range End', "4.4.4.4")
        c.click('Source Address Filter Add')
        c.set('Source IP/Range/Subset One', "1.1.1.1")
        c.set('Source IP/Range/Subset Two', "2.2.2.2")
        c.checked('Port Forwarding')
        c.set('External Service Port Start', 1)
        c.set('External Service Port End', 2)
        c.set('Map to Port Start', 3)
        c.set('Comments', "test comments")

        c.click('Save')
    },
    verify: (g) => {
        g.click('Virtual IPs')

        g.click('Virtual IP One')
        g.click('Edit')
        g.isSet('Name', "virtual ip one")
        g.has('Interface any')
        g.isSet('External IP Address/Range Start', "1.1.1.1")
        g.isSet('External IP Address/Range End', "2.2.2.2")
        g.isSet('Mapped IP Address/Range Start', "3.3.3.3")
        g.isSet('Mapped IP Address/Range End', "4.4.4.4")
        g.isChecked('Source Address Filter Status')
        g.has('Source IP/Range/Subset One')
        g.has('Source IP/Range/Subset Two')
        g.isChecked('Port Forwarding')
        g.isChecked('Protocol TCP')
        g.isSet('External Service Port Start', 1)
        g.isSet('External Service Port End', 2)
        g.isSet('Map to Port Start', 3)
        g.isSet('Map to Port End', 4)
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'virtual ip delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Virtual IPs')
        c.click('Delete Virtual IP One')
        c.click('YES')
    },
    verify: (g) => {
        g.click('Virtual IPs')
        g.isDelete('Virtual IP One')
    }
})
