let Testcase = require('../../src/testcase.js');

let cloudMap = {
    'RoutingPolicy': "div.gwt-HTML:contains('Policy Routes')",
    'Create New': "button:contains('Create New')",
    'Save': "span:contains('Save')",
    'Edit Last Item': "td.left:contains('192.168.18') ~td.right div[title='Edit']:last()",
    'Delete Last Item': "td.left:contains('192.168.18') ~td.right div[title='Delete']:last()",
    'YES': "span:contains('YES')",
}

let gateMap = {
    'Network': "//span[text()='Network']",
    'RoutingPolicy': "a[ng-href='page/p/router/policy/']",
    'IPV4Policy': `button:contains('IPv4 Policy Route')`,
    '192.168.18.0 routing': "tr>td>span:contains('192.168.18.0')",
    'Destination IPMask': "input#dst",
    'Gateway': "input#gateway",
    'Administrative Distance': "input#distance",
    'Device Interface': "div.selected-entry>span>span>span",
    'Comments': "textarea#comment",

    'Edit': "button span:contains('Edit'):eq(0)",
}


function openPolicyRoute(self) {
    self.click(gateMap['Network'])
    self.wait(3000)
    self.click(gateMap['RoutingPolicy'])
    self.wait(1000)
}
new Testcase({
    //tcp, udp, sctp mode
    name: 'policy_route_tcp new',
    testcase() {
        this.click(cloudMap['RoutingPolicy'])
        this.click(cloudMap['Create New'])
        this.wait(2000)

        //"If incoming traffic matches" module
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-protocol", "TCP")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-inIntf", ["dmz","internal"])`)
        this.set('#fcld-routingPolicyEditor-srcAddr', "192.168.18.1/24")
        this.set('#fcld-routingPolicyEditor-dstAddr', "192.168.18.2/24")
        this.set('#fcld-routingPolicyEditor-portSrcFrom', "1")
        this.set('#fcld-routingPolicyEditor-portSrcTo', "65536")
        this.set('#fcld-routingPolicyEditor-portDstFrom', "1")
        this.set('#fcld-routingPolicyEditor-portDstTo', "65535")
        this.set('#fcld-routingPolicyEditor-service', "0xff")
        this.set('#fcld-routingPolicyEditor-serviceMask', "0xff")

        //"then" module
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-action", "Forward Traffic")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-outIntf", "dmz")`)
        this.set('#fcld-routingPolicyEditor-gatewayAddr', "192.168.18.1")
        this.set('#fcld-routingPolicyEditor-comments', "test comments")
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-status", "Enabled")`)

        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openPolicyRoute(this)
        this.click(gateMap['IPV4Policy'])
        this.wait(1000)
        this.has("192.168.18")
        // this.isSet(gateMap['Destination IP'], "192.168.18.0")
        // this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
        // this.isSet(gateMap['Gateway'], "192.168.1.1")
        // this.isSet(gateMap['Administrative Distance'], 11)
        // this.isSet(gateMap['Device Interface'], "internal")
        // this.isSet(gateMap['Comments'], "test comments")
    }
})


new Testcase({
    name: 'policy_route_tcp delete',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['RoutingPolicy'])
        this.click(cloudMap['Delete Last Item'])
        this.click(cloudMap['YES'])
        this.click(cloudMap['YES']) // still need double click
    },
    verify() {
        openPolicyRoute(this)
        this.click(gateMap['IPV4Policy'])
        this.wait(1000)
        this.isDelete("192.168.18")
    }
})

new Testcase({
    name: 'routing policy edit',
    testcase() {
        //subnet case
        this.click(cloudMap['RoutingPolicy'])
        this.click(cloudMap['Edit Second Item'])
        this.wait(2000)
        this.set('#fcld-routingEditor-destIp', "192.168.18.1")
        this.set('#fcld-routingEditor-destMask', "255.255.0.0")
        this.set('#fcld-routingEditor-gateway', "192.168.1.1")
        this.set('#fcld-routingEditor-distance', 12)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-device", "dmz")`)
        this.wait(1000)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingEditor-status", "Disabled")`)
        this.set('#fcld-routingEditor-comment', "test comments")
        this.set('#fcld-routingEditor-priority', "2")
        this.wait(3000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openPolicyRoute(this)
        this.click(gateMap['IPV4Policy'])
        this.wait(1000)
    }
})

new Testcase({
    //any mode
    name: 'policy_route_any new',
    testcase() {
        this.click(cloudMap['RoutingPolicy'])
        this.click(cloudMap['Create New'])
        this.wait(2000)

        //"If incoming traffic matches" module
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-protocol", "Any")`)
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-inIntf", ["dmz","internal"])`)
        this.set('#fcld-routingPolicyEditor-srcAddr', "192.168.18.1/24")
        this.set('#fcld-routingPolicyEditor-dstAddr', "192.168.18.2/24")
        this.set('#fcld-routingPolicyEditor-service', "0xff")
        this.set('#fcld-routingPolicyEditor-serviceMask', "0xff")

        //"then" module
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-action", "Stop Policy Routing")`)
        this.set('#fcld-routingPolicyEditor-comments', "test comments")
        this.evaluate(`FcldUiTest.setUiObjectValue("routingPolicyEditor-status", "Disabled")`)

        this.wait(2000)
        this.click(cloudMap['Save'])
    },
    verify() {
        openPolicyRoute(this)
        this.click(gateMap['IPV4Policy'])
        this.wait(1000)
        this.has("192.168.18")
        // this.isSet(gateMap['Destination IP'], "192.168.18.0")
        // this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
        // this.isSet(gateMap['Gateway'], "192.168.1.1")
        // this.isSet(gateMap['Administrative Distance'], 11)
        // this.isSet(gateMap['Device Interface'], "internal")
        // this.isSet(gateMap['Comments'], "test comments")
    }
})


new Testcase({
    name: 'policy_route_any delete',
    testcase() {
        this.wait(2000)
        this.click(cloudMap['RoutingPolicy'])
        this.click(cloudMap['Delete Last Item'])
        this.click(cloudMap['YES'])
        this.click(cloudMap['YES']) // still need double click
    },
    verify() {
        openPolicyRoute(this)
        this.click(gateMap['IPV4Policy'])
        this.wait(1000)
        this.isDelete("192.168.18")
    }
})


