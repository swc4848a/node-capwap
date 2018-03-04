let Testcase = require('../src/testcase.js');

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
    testcase() {
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Create New'])
        this.wait(2000)
        this.set(cloudMap['Destination IP'], "192.168.18.0")
        this.set(cloudMap['Destination Netmask'], "255.255.255.0")
        this.set(cloudMap['Gateway'], "192.168.1.1")
        this.set(cloudMap['Administrative Distance'], 11)
        this.set(cloudMap['Device Interface'], "internal")
        this.set(cloudMap['Comments'], "test comments")
        this.click(cloudMap['Save'])
        this.wait(2000)
    },
    verify() {
        this.isSet(gateMap['Destination IP'], "192.168.18.0")
        this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
        this.isSet(gateMap['Gateway'], "192.168.1.1")
        this.isSet(gateMap['Administrative Distance'], 11)
        this.isSet(gateMap['Device Interface'], "internal")
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'routing edit',
    testcase() {
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Edit Second Item'])

        this.set(cloudMap['Destination IP'], "192.168.18.0")
        this.set(cloudMap['Destination Netmask'], "255.255.255.0")
        this.set(cloudMap['Gateway'], "192.168.1.1")
        this.set(cloudMap['Administrative Distance'], 12)
        this.set(cloudMap['Device Interface'], "wan2")
        this.set(cloudMap['Comments'], "test comments")

        this.click(cloudMap['Save'])
    },
    verify() {
        this.isSet(gateMap['Destination IP'], "192.168.18.0")
        this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
        this.isSet(gateMap['Gateway'], "192.168.1.1")
        this.isSet(gateMap['Administrative Distance'], 12)
        this.isSet(gateMap['Device Interface'], "wan2")
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'routing delete',
    testcase() {
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Delete Second Item'])
        this.click(cloudMap['YES'])
        this.click(cloudMap['YES']) // still need double click
    },
    verify() {
        this.click(gateMap['Routing'])
        this.isDelete(gateMap['192.168.18.0 routing'])
    }
})