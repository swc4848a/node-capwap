let Testcase = require('../testcase.js');

let cloudMap = {
    'Routing': "div.gwt-HTML:contains('Static Routes')",
    'Create New': "button:contains('Create New')",
    'Destination IP': "input.gwt-TextBox:eq(0)",
    'Destination Netmask': "input.gwt-TextBox:eq(1)",
    'Gateway': "input.gwt-TextBox:eq(2)",
    'Administrative Distance': "input:eq(42)",
    'Device Interface': "select",
    'Comments': "textarea.gwt-TextArea",
    'Save': "span:contains('Save')",

    'Edit Second Item': "div[title='Edit']:eq(1)",
    'Delete Second Item': "div[title='Delete']:eq(1)",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Routing': "a[href='page/p/router/static/']",
    '192.168.18.0 routing': "tr>td>span:contains('192.168.18.0')",
    'Destination IPMask': "input#dst",
    'Gateway': "input#gateway",
    'Administrative Distance': "input#distance",
    'Device Interface': "div.selected-entry>span>span>span",
    'Comments': "textarea#comment",

    'Edit': "button span:contains('Edit'):eq(0)",
}

new Testcase({
    name: 'routing new',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Routing')
        c.click('Create New')
        c.sleep(2000)
        c.set('Destination IP', "192.168.18.0")
        c.set('Destination Netmask', "255.255.255.0")
        c.set('Gateway', "192.168.1.1")
        c.set('Administrative Distance', 11)
        c.set('Device Interface', "internal")
        c.set('Comments', "test comments")
        c.click('Save')
        c.sleep(2000)
    },
    verify: (g) => {
        g.redirect('/ng/page/p/router/static/edit/2')
        g.isSet('Destination IP', "192.168.18.0")
        g.isSet('Destination Netmask', "255.255.255.0")
        g.isSet('Gateway', "192.168.1.1")
        g.isSet('Administrative Distance', 11)
        g.isSet('Device Interface', "internal")
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'routing edit',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Routing')
        c.click('Edit Second Item')

        c.set('Destination IP', "192.168.18.0")
        c.set('Destination Netmask', "255.255.255.0")
        c.set('Gateway', "192.168.1.1")
        c.set('Administrative Distance', 12)
        c.set('Device Interface', "wan2")
        c.set('Comments', "test comments")

        c.click('Save')
    },
    verify: (g) => {
        g.redirect('/ng/page/p/router/static/edit/2')
        g.isSet('Destination IP', "192.168.18.0")
        g.isSet('Destination Netmask', "255.255.255.0")
        g.isSet('Gateway', "192.168.1.1")
        g.isSet('Administrative Distance', 12)
        g.isSet('Device Interface', "wan2")
        g.isSet('Comments', "test comments")
    }
})

new Testcase({
    name: 'routing delete',
    cloud: cloudMap,
    gate: gateMap,
    testcase: (c) => {
        c.click('Routing')
        c.click('Delete Second Item')
        c.click('YES')
        c.click('YES') // still need double click
    },
    verify: (g) => {
        g.click('Routing')
        g.isDelete('192.168.18.0 routing')
    }
})
