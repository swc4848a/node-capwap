let Testcase = require("src/testcase.js");

let policyName = "policy_test";
let cloudMap = {
  Interfaces: "div.gwt-HTML:contains('Interfaces')",
  "IPv4 Policy": "div.gwt-HTML:contains('IPv4 Policy'):eq(0)",
  "Create New": "button:contains('Create New')",
  "Delete Last Item": `td.left:contains('${policyName}') ~td.right div[title='Delete']:last()`,
  Save: "span:contains('Save')",
  YES: "span:contains('YES')"
};

let gateMap = {
  Network: "//span[text()='Network']",
  Interfaces: "a[ng-href='page/p/system/interface/']",
  "Policy & Objects": "//span[text()='Policy & Objects']",
  "IPv4 Policy": "//span[text()='IPv4 Policy']"
};

function openIPV4Policy(self) {
  self.click(gateMap["Policy & Objects"]);
  self.wait(1000);
  self.click("//span[text()='IPv4 Policy']");
  self.wait(1000);
}

new Testcase({
  name: "ipv4 policy vlan interface new",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Interfaces)", "click")`);
    this.wait(1000);
    this.click(cloudMap["Create New"]);
    this.wait(1000);
    this.set("#fcld-interfaceEditor-name", `policy-intf`);
    this.set("#fcld-interfaceEditor-alias", `policy-intf`);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-type", "VLAN")`
    );
    // this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-physIntf", "wan")`)
    this.evaluate(`FcldUiTest.setUiObjectValue("interfaceEditor-role", "LAN")`);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-vlanid", "2048")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-addrModeGroup", "DHCP")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-dhcpDefaultgw", "false")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-dhcpDnsServerOverride", "false")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-deviceDetect", "true")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-miscScanGroup", "Monitor")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-intfStateGroup", "Disable")`
    );
    this.set("#fcld-interfaceEditor-comments", "test comments");

    this.wait(1000);
    this.click(cloudMap["Save"]);
    this.wait(5000);
  }
});

/**
 * Editor: interfaceEditor
 * Key/Id
 *  i : name,
 *  k : srcintf,
 *  k : dstintf,
 *  k : srcaddr,
 *  k : dstaddr,
 *  k : schedule,
 *  k : service,
 *  k : action,
 *  k : nat,
 *  k : fixedport,
 *  k : ippool,
 *  k : poolname,
 *  k : avProfile,
 *  k : webfilterProfile,
 *  k : dnsfilterProfile,
 *  k : applicationList,
 *  k : ipsProfile,
 *  k : profileProtocolOptions,
 *  k : sslSshProfile,
 *  k : logtraffic,
 *  k : logtrafficEnable,
 *  k : status,
 *  i : comments
 */

new Testcase({
  name: "ipv4 policy new",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(IPv4 Policy)", "click")`);
    this.wait(1000);
    this.click(cloudMap["Create New"]);
    this.wait(1000);

    this.set("#fcld-policyEditor-name", policyName);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-srcintf", ["policy-intf"])`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-dstintf", ["policy-intf"])`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-srcaddr", ["all","none"])`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-dstaddr", ["all","none"])`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-schedule", ["always"])`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-service", ["HTTP","IMAP"])`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-action", "Accept")`
    );
    this.evaluate(`FcldUiTest.setUiObjectValue("policyEditor-nat", "true")`);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-fixedport", "true")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-ippool", "Use Outgoing Interface Address")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-logtraffic", "All Sessions")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("policyEditor-logtrafficEnable", "false")`
    );
    this.set("#fcld-policyEditor-comments", "test comments");
    this.click("#fcld-policyEditor-save");
  },
  verify() {
    openIPV4Policy(this);
    this.wait(3000);
    this.has(policyName);
  }
});

new Testcase({
  name: "ipv4 policy delete",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(IPv4 Policy)", "click")`);
    this.wait(1000);
    this.click(cloudMap["Delete Last Item"]);
    this.wait(2000);
    this.click(cloudMap["YES"]);
  },
  verify() {
    openIPV4Policy(this);
    this.isDelete(policyName);
  }
});

new Testcase({
  name: "ipv4 policy vlan interface delete",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Interfaces)", "click")`);
    this.wait(500);
    this.click(`td.left:contains('policy-intf')~td.right div[title='Delete']`);
    this.click(cloudMap["YES"]);
  }
});
