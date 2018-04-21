let Testcase = require('../../src/testcase.js');

let subNetComment = "subNet comment"
let nameAddressComment = "nameAddress comment"
let internetServiceComment = "internetService comment"

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

    'Edit Second Item': "td.left:contains('192.168.1.1') ~td div[title='Edit']",
    'Delete subNet': `td.left:contains('${subNetComment}') ~td div[title='Delete']`,
    'Delete name address': `td.left:contains('${nameAddressComment}') ~td div[title='Delete']`,
    'Delete internet service': `td.left:contains('${internetServiceComment}') ~td div[title='Delete']`,
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Network': "//span[text()='Network']",
    'Routing': "a[href='page/p/router/static/']",
    '192.168.18.0 routing': "tr>td>span:contains('192.168.18.0')",
    'Destination IP/Netmask': `input#dst`,
    'Gateway': "input#gateway",
    'Administrative Distance': "input#distance",
    'Device Interface': "div.selected-entry>span>span>span",
    'Comments': "textarea#comment",

    'Edit': "button span:contains('Edit'):eq(0)",
}
/**
 * Editor: routingEditor	
 * Key/Id:
 *  k: "priority",
 *  k: "distance",
	k: "destinationMode",
    i: "destIp",
    i: "destMask",
    k: "dstaddr",
    k: "internetService",
    i: "gateway",
    k: "device",
    k: "status",
	i: "comment".
 */


function openStaticRoutes(self) {
    self.click(gateMap['Network'])
    self.wait(1000)
    self.click(gateMap['Routing'])
    self.wait(5000)
}


new Testcase({
    name: 'route_subnet new',
    testcase() {
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Create New'])
        this.wait(2000)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-destinationMode", "Subnet")`)
        this.set('#fcld-routingEditor-destIp', "192.168.18.0")
        this.set('#fcld-routingEditor-destMask', "255.255.255.0")
        this.set('#fcld-routingEditor-gateway', "192.168.1.1")
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-device", "internal")`)
        this.set('#fcld-routingEditor-distance', 11)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-status", "Enabled")`)
        this.set('#fcld-routingEditor-comment', subNetComment)
        this.set('#fcld-routingEditor-priority', "1")

        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openStaticRoutes(this)
        this.has(subNetComment)
    }
})

new Testcase({
    name: 'routing edit',
    testcase() {
        //subnet case
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Edit Second Item'])
        this.wait(2000)
        this.set('#fcld-routingEditor-destIp', "192.168.18.1")
        this.set('#fcld-routingEditor-destMask', "255.255.0.0")
        this.set('#fcld-routingEditor-gateway', "192.168.1.1")
        this.set('#fcld-routingEditor-distance', 12)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-device", "dmz")`)
        this.wait(1000)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-status", "Disabled")`)
        this.set('#fcld-routingEditor-comment', "test comments test")
        this.set('#fcld-routingEditor-priority', "2")
        this.wait(3000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openStaticRoutes(this)
        this.click(`//span[text()="192.168.0.0/16"]`)
        this.click(`//span[text()="Edit"]`)
        this.wait(2000)
        this.isSet(gateMap['Destination IP/Netmask'], "192.168.18.1/255.255.0.0")
        this.isSet(gateMap['Gateway'], "192.168.1.1")
        this.isSet(gateMap['Administrative Distance'], 12)
        this.isSet(gateMap['Device Interface'], "wan2")
        this.isSet(gateMap['Comments'], "test comments")
    }
})

new Testcase({
    name: 'route_subnet delete',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Delete subNet'])
        this.click(cloudMap['YES'])
        this.click(cloudMap['YES']) // still need double click
    },
    verify() {
        openStaticRoutes(this)
        this.isDelete(subNetComment)
    }

})

//test failed, because name address disabled in forticloud.
new Testcase({
    name: 'route_named_address new',
    testcase() {
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Create New'])
        this.wait(2000)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-destinationMode", "Named Address")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-dstaddr", "all")`)
        this.set('#fcld-routingEditor-gateway', "192.168.1.1")
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-device", "internal")`)
        this.set('#fcld-routingEditor-distance', 11)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-status", "Enabled")`)
        this.set('#fcld-routingEditor-comment', nameAddressComment)
        this.set('#fcld-routingEditor-priority', "1")

        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openStaticRoutes(this)
        this.has(nameAddressComment)
    }
})


new Testcase({
    name: 'route_named_address delete',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Delete name address'])
        this.click(cloudMap['YES'])
        this.click(cloudMap['YES']) // still need double click
    },
    verify() {
        openStaticRoutes(this)
        this.isDelete(nameAddressComment)
    }
})

new Testcase({
    name: 'route_internet_service new',
    testcase() {
        this.click(cloudMap['Routing'])
        this.click(cloudMap['Create New'])
        this.wait(2000)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-destinationMode", "Internet Service")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-dstaddr", "none")`)
        this.set('#fcld-routingEditor-gateway', "192.168.2.1")
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-device", "dmz")`)
        this.set('#fcld-routingEditor-distance', 12)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-status", "Disabled")`)
        this.set('#fcld-routingEditor-comment', internetServiceComment)
        this.set('#fcld-routingEditor-priority', "2")

        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openStaticRoutes(this)
        this.has(internetServiceComment)
    }
})


new Testcase({
    name: 'route_internet_service delete',
    testcase() {
        this.click(cloudMap['Routing'])
        this.wait(1000)
        this.click(cloudMap['Delete internet service'])
        this.click(cloudMap['YES'])
        this.wait(1000)
        this.click(cloudMap['YES']) // still need double click
    },
    verify() {
        openStaticRoutes(this)
        this.isDelete(internetServiceComment)
    }
})