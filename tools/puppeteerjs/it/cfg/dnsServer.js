let Testcase = require("src/testcase.js");

//interface
let interfaceName = "dns-intf";

//server
let masterDomain = "dns_master_test";
let masterZone = "master_zone";
let slaveDomain = "dns_slave_test";
let slaveZone = "slave_zone";

let cloudMap = {
  "DNS Servers": "div.gwt-HTML:contains('DNS Servers'):eq(0)",
  "Interface Create New": "button:contains('Create New'):eq(0)",
  "Interface delete": `td.left:contains('${interfaceName}')~td.right div[title='Delete']:eq(0)`,
  "Database Create New": "button:contains('Create New'):eq(1)",
  "Database_master delete": `td.left:contains('${masterDomain}')~td.right div[title='Delete']:eq(0)`,
  "Database_slave delete": `td.left:contains('${slaveDomain}')~td.right div[title='Delete']:eq(0)`,
  YES: "span:contains('YES')",
  Save: "span:contains('Save')",
  OK: `//button[text()="OK"]`
};

let gateMap = {
  Network: "//span[text()='Network']",
  DNSServers: "a[ng-href='network/dns']",
  "Use FortiGuard Servers": "input#type_fortiguard",
  Specify: "input#type_specify",
  "Primary DNS Server": "input#primary",
  "Secondary DNS Server": "input#secondary",
  "Local Domain Name": "input#domain"
};

function openDNSServer(self) {
  self.click(gateMap["Network"]);
  self.wait(1000);
  self.click(gateMap["DNSServers"]);
  self.wait(1000);
}

/**
 * Editor: dnsServiceEditor
 * Key/Id
 *  k : intfCombo,
 *  k : modeCombo
 */

new Testcase({
  name: "dns interface new",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Interfaces)", "click")`);
    this.wait(1000);
    this.click(`button:contains("Create New")`);
    this.wait(`#fcld-interfaceEditor-name`);
    this.set(`#fcld-interfaceEditor-name`, interfaceName);
    this.set(`#fcld-interfaceEditor-vlanid`, 200);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-addrModeGroup", "DHCP")`
    );
    this.click(`#fcld-interfaceEditor-save`);
  }
});

new Testcase({
  name: "dns_server_interface new",
  testcase() {
    this.click(cloudMap["DNS Servers"]);
    this.wait(1000);
    this.click(cloudMap["Interface Create New"]);
    this.wait(`#fcld-dnsServiceEditor-intfCombo`);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("dnsServiceEditor-intfCombo", "${interfaceName}")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("dnsServiceEditor-modeCombo", "NON_RECURSIVE")`
    );
    this.click(cloudMap["Save"]);
    this.click(`//button[text()="OK"]`);
  },
  verify() {
    openDNSServer(this);
    this.click(`//span[text()="Network"]`);
    this.click(`//span[text()="DNS Servers"]`);
    this.wait(2000);
    this.click(`//span[text()="${interfaceName}"]`);
    this.click(`span:contains('Edit'):eq(0)`);
    this.wait(2000);
    this.has(`${interfaceName}`, `div.single-select`);
    this.click(`button#submit_cancel`);
  }
});

new Testcase({
  name: "dns_server_interface delete",
  testcase() {
    this.wait(1000);
    this.click(cloudMap["DNS Servers"]);
    this.click(cloudMap["Interface delete"]);
    this.wait(1000);
    this.click(cloudMap["YES"]);
  },
  verify() {
    openDNSServer(this);
    this.isDelete(interfaceName, `div.qlist-table`);
  }
});

new Testcase({
  name: "dns interface clean",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Interfaces)", "click")`);
    this.wait(1000);
    this.click(
      `td.left:contains("${interfaceName}")~td.last div[title="Delete"]`
    );
    this.wait(`//td[text()="Are you sure you want to delete this item?"]`);
    this.click(`//span[text()="YES"]`);
  }
});

/**
 * Editor: dnsDatabaseEditor
 * Key/Id
 *  k : type,
 *  k : view,
 *  i : dnsZoneTextBox
 *  i : domainNameTextBox,
 *  i : hostnameTextBox,
 *  i : contactEmailTextBox,
 *  i : ttlTextBox,
 *  i : ipOfMasterTextBox,
 *  k : authoritativeCombox
 */

new Testcase({
  name: "dns_database_master new",
  testcase() {
    this.wait(2000);
    this.click(cloudMap["DNS Servers"]);
    this.click(cloudMap["Database Create New"]);

    this.evaluate(
      `FcldUiTest.setUiObjectValue("dnsDatabaseEditor-type", "Master")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("dnsDatabaseEditor-view", "Public")`
    );
    this.set("#fcld-dnsDatabaseEditor-dnsZoneTextBox", masterZone);
    this.set("#fcld-dnsDatabaseEditor-domainNameTextBox", masterDomain);
    this.set("#fcld-dnsDatabaseEditor-hostnameTextBox", "hostname1");
    this.set(
      "#fcld-dnsDatabaseEditor-contactEmailTextBox",
      "abcd@fortinet.com"
    );
    this.set("#fcld-dnsDatabaseEditor-ttlTextBox", "80000");
    this.evaluate(
      `FcldUiTest.setUiObjectValue("dnsServiceEditor-authoritativeCombox", "Enable")`
    );

    this.wait(3000);
    this.click(cloudMap["Save"]);
    //It's bug, test case trigger two requests, so it's necessary to click yes,
    //when bug fixed, remove this clause.
    this.wait(1000);
    this.click(cloudMap["OK"]);
  },
  verify() {
    openDNSServer(this);
    this.has(masterDomain);
    // this.click(gateMap['DNS Servers'])
    // this.isCheck(gateMap['Use FortiGuard Servers'])
    // this.isSet(gateMap['Primary DNS Server'], "208.91.112.53")
    // this.isSet(gateMap['Secondary DNS Server'], "208.91.112.52")
    // this.isSet(gateMap['Local Domain Name'], "test domain")
  }
});

new Testcase({
  name: "dns_database_master delete",
  testcase() {
    this.wait(2000);
    this.click(cloudMap["DNS Servers"]);
    this.wait(2000);
    this.click(cloudMap["Database_master delete"]);
    this.wait(2000);
    this.click(cloudMap["YES"]);
  },
  verify() {
    openDNSServer(this);
    this.isDelete(masterDomain);
  }
});
new Testcase({
  name: "dns_database_slave new",
  testcase() {
    this.wait(2000);
    this.click(cloudMap["DNS Servers"]);
    this.click(cloudMap["Database Create New"]);

    this.evaluate(
      `FcldUiTest.setUiObjectValue("dnsDatabaseEditor-type", "Slave")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("dnsDatabaseEditor-view", "Shadow")`
    );
    this.set("#fcld-dnsDatabaseEditor-dnsZoneTextBox", slaveZone);
    this.set("#fcld-dnsDatabaseEditor-domainNameTextBox", slaveDomain);
    this.set("#fcld-dnsDatabaseEditor-ipOfMasterTextBox", "192.168.1.1");
    this.evaluate(
      `FcldUiTest.setUiObjectValue("dnsServiceEditor-authoritativeCombox", "Enable")`
    );

    this.wait(2000);
    this.click(cloudMap["Save"]);
    //It's bug, test case trigger two requests, so it's necessary to click yes,
    //when bug fixed, remove this clause.
    this.wait(1000);
    this.click(cloudMap[`OK`]);
  },
  verify() {
    openDNSServer(this);
    this.click(`//span[text()="Network"]`);
    this.click(`//span[text()="DNS Servers"]`);
    this.wait(2000);
    this.click(`//td[text()="slave_zone"]`);
    this.click(`span:contains('Edit'):eq(1)`);
    this.wait(2000);
    // todo:
    // this.isSet(`input#type_slave`, ``)
    this.isSet(`input[ng-model="$ctrl.database.name"]`, `slave_zone`);
    this.isSet(`input[ng-model="$ctrl.database.domain"]`, `dns_slave_test`);
    this.isSet(`input[ng-model="$ctrl.database['ip-master']"]`, `192.168.1.1`);
    this.isCheck(`input#authoritative`);
    this.click(`button#submit_cancel`);
  }
});

new Testcase({
  name: "dns_database_slave delete",
  testcase() {
    this.wait(2000);
    this.click(cloudMap["DNS Servers"]);
    this.wait(2000);
    this.click(cloudMap["Database_slave delete"]);
    this.wait(2000);
    this.click(cloudMap["YES"]);
  },
  verify() {
    openDNSServer(this);
    this.isDelete(slaveDomain);
  }
});
