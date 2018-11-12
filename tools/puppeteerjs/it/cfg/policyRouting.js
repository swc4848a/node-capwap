let Testcase = require("src/testcase.js");

let cloudMap = {
  RoutingPolicy: "div.gwt-HTML:contains('Policy Routes')",
  "Create New": "button:contains('Create New')",
  Save: "span:contains('Save')",
  "Edit Last Item":
    "td.left:contains('192.168.18') ~td.right div[title='Edit']:last()",
  "Delete Last Item":
    "td.left:contains('192.168.18') ~td.right div[title='Delete']:last()",
  YES: "span:contains('YES')"
};

let gateMap = {
  Network: "//span[text()='Network']",
  RoutingPolicy: "a[ng-href='page/p/router/policy/']",
  "Policy Routes": `button:contains('Policy Routes')`,
  "192.168.18.0 routing": "tr>td>span:contains('192.168.18.0')",
  "Destination IPMask": "input#dst",
  Gateway: "input#gateway",
  "Administrative Distance": "input#distance",
  "Device Interface": "div.selected-entry>span>span>span",
  Comments: "textarea#comment",
  Edit: "button span:contains('Edit'):eq(0)"
};

function openPolicyRoute(self) {
  self.click(gateMap["Network"]);
  self.wait(3000);
  self.click(gateMap["RoutingPolicy"]);
  self.wait(1000);
}

/**
 * Editor: routingPolicyEditor
 * Key/Id
 *  k : protocol,
 *  i : protoNum,
 *  k : inIntf,
 *  i : srcAddr,
 *  i : dstAddr,
 *  i : portSrcFrom,
 *  i : portSrcTo,
 *  i : portDstFrom,
 *  i : portDstTo,
 *  i : service,
 *  i : serviceMask,
 *  k : action,
 *  k : outIntf,
 *  i : gatewayAddr,
 *  i : comments,
 *  k : status
 */

new Testcase({
  name: "policy route tcp new",
  testcase() {
    this.click(cloudMap["RoutingPolicy"]);
    this.wait(3000);
    this.click(cloudMap["Create New"]);
    this.wait(2000);

    //"If incoming traffic matches" module
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-protocol", "TCP")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-inIntf", ["wan"])`
    );
    this.set("#fcld-routingPolicyEditor-srcAddr", "192.168.18.0/24");
    this.set("#fcld-routingPolicyEditor-dstAddr", "192.168.19.0/24");
    this.set("#fcld-routingPolicyEditor-portSrcFrom", "1");
    this.set("#fcld-routingPolicyEditor-portSrcTo", "30000");
    this.set("#fcld-routingPolicyEditor-portDstFrom", "30001");
    this.set("#fcld-routingPolicyEditor-portDstTo", "65535");
    this.set("#fcld-routingPolicyEditor-service", "0xff");
    this.set("#fcld-routingPolicyEditor-serviceMask", "0xff");

    //"then" module
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-action", "Forward Traffic")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-outIntf", "wan")`
    );
    this.set("#fcld-routingPolicyEditor-gatewayAddr", "192.168.18.1");
    this.set("#fcld-routingPolicyEditor-comments", "test comments");
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-status", "Enabled")`
    );

    this.wait(2000);
    this.click(cloudMap["Save"]);
  },
  verify() {
    openPolicyRoute(this);
    this.click(gateMap["Policy Routes"]);
    this.wait(3000);
    this.click(`//tr[@mkey="1"]`);
    this.click(`//span[text()="Edit"]`);
    this.wait(3000);
    this.isCheck(`input#protocol-6`);
    this.isSet(`input#src`, `192.168.18.0/255.255.255.0`);
    this.isSet(`input#dst`, `192.168.19.0/255.255.255.0`);
    this.isSet(`input#start-source-port`, `1`);
    this.isSet(`input[name="end-source-port"]`, `30000`);
    this.isSet(`input#start-port`, `30001`);
    this.isSet(`input#end-port`, `65535`);
    this.isSet(`input#tos`, `0xff`);
    this.isSet(`input#tos-mask`, `0xff`);
    this.isCheck(`input#action-permit`);
    this.isSet(`input[name="gateway"]`, `192.168.18.1`);
    this.isSet(`textarea#comment`, `test comments`);
    this.isCheck(`input#status_enable`);
    this.click(`button#submit_cancel`);
  }
});

// when new we will create two policy route so we only edit the first one
new Testcase({
  name: "policy route tcp edit",
  testcase() {
    this.click(cloudMap["RoutingPolicy"]);
    this.wait(3000);
    this.click(`td.right:first div[title="Edit"]`);
    this.wait(2000);
    this.set("#fcld-routingPolicyEditor-srcAddr", "192.168.20.0/24");
    this.set("#fcld-routingPolicyEditor-dstAddr", "192.168.21.0/24");
    this.wait(3000);
    this.click(cloudMap["Save"]);
  },
  verify() {
    openPolicyRoute(this);
    this.click(gateMap["Policy Routes"]);
    this.wait(3000);
    this.click(`//tr[@mkey="1"]`);
    this.click(`//span[text()="Edit"]`);
    this.wait(3000);
    this.isCheck(`input#protocol-6`);
    this.isSet(`input#src`, `192.168.20.0/255.255.255.0`);
    this.isSet(`input#dst`, `192.168.21.0/255.255.255.0`);
    this.isSet(`input#start-source-port`, `1`);
    this.isSet(`input[name="end-source-port"]`, `30000`);
    this.isSet(`input#start-port`, `30001`);
    this.isSet(`input#end-port`, `65535`);
    this.isSet(`input#tos`, `0xff`);
    this.isSet(`input#tos-mask`, `0xff`);
    this.isCheck(`input#action-permit`);
    this.isSet(`input[name="gateway"]`, `192.168.18.1`);
    this.isSet(`textarea#comment`, `test comments`);
    this.isCheck(`input#status_enable`);
    this.click(`button#submit_cancel`);
  }
});

new Testcase({
  name: "policy route tcp delete",
  testcase() {
    this.wait(2000);
    this.click(cloudMap["RoutingPolicy"]);
    this.click(`td.right:first div[title="Delete"]`);
    this.click(cloudMap["YES"]);
    this.wait(1000);
    this.click(`td.right:first div[title="Delete"]`);
    this.click(cloudMap["YES"]);
  },
  verify() {
    openPolicyRoute(this);
    this.click(gateMap["Policy Routes"]);
    this.wait(1000);
    this.isDelete("192.168");
  }
});

new Testcase({
  name: "policy route any new",
  testcase() {
    this.click(cloudMap["RoutingPolicy"]);
    this.click(cloudMap["Create New"]);
    this.wait(2000);

    //"If incoming traffic matches" module
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-protocol", "wan")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-inIntf", ["wan","lan"])`
    );
    this.set("#fcld-routingPolicyEditor-srcAddr", "192.168.18.0/24");
    this.set("#fcld-routingPolicyEditor-dstAddr", "192.168.19.0/24");
    this.set("#fcld-routingPolicyEditor-service", "0xff");
    this.set("#fcld-routingPolicyEditor-serviceMask", "0xff");

    //"then" module
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-action", "Stop Policy Routing")`
    );
    this.set("#fcld-routingPolicyEditor-comments", "test comments");
    this.evaluate(
      `FcldUiTest.setUiObjectValue("routingPolicyEditor-status", "Disabled")`
    );

    this.wait(2000);
    this.click(cloudMap["Save"]);
  },
  verify() {
    openPolicyRoute(this);
    this.click(gateMap["Policy Routes"]);
    this.wait(3000);
    this.click(`//tr[@mkey="1"]`);
    this.click(`//span[text()="Edit"]`);
    this.wait(3000);
    this.isCheck(`input#protocol-0`);
    this.isSet(`input#src`, `192.168.18.0/255.255.255.0`);
    this.isSet(`input#dst`, `192.168.19.0/255.255.255.0`);
    this.isSet(`input#tos`, `0xff`);
    this.isSet(`input#tos-mask`, `0xff`);
    this.isCheck(`input#action-deny`);
    this.isSet(`textarea#comment`, `test comments`);
    this.isCheck(`input#status_disable`);
    this.click(`button#submit_cancel`);
  }
});

new Testcase({
  name: "policy route any delete",
  testcase() {
    this.wait(2000);
    this.click(cloudMap["RoutingPolicy"]);
    this.click(`td.right:first div[title="Delete"]`);
    this.click(cloudMap["YES"]);
    this.wait(1000);
    this.click(`td.right:first div[title="Delete"]`);
    this.click(cloudMap["YES"]);
  },
  verify() {
    openPolicyRoute(this);
    this.click(gateMap["Policy Routes"]);
    this.wait(1000);
    this.isDelete("192.168");
  }
});
