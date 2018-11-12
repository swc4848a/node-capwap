let Testcase = require("src/testcase.js");

let sparseModeKeyword = "777";
let denseModeKeyword = "multi-intf";

let cloudMap = {
  MultiCast: "div.gwt-HTML:contains('Multicast')",
  "Create New": "button:contains('Create New')",
  Save: "span:contains('Save')",

  "Edit first Item":
    "td.left:contains('wan') ~td.right div[title='Edit']:eq(0)",
  "Delete Sparse Item": `td.left:contains('888') ~td.right div[title='Delete']:eq(0)`,
  "Delete Dense Item": `td.left:contains('${denseModeKeyword}') ~td.right div[title='Delete']:eq(0)`,
  YES: "span:contains('YES')"
};

let gateMap = {
  Network: "//span[text()='Network']",
  MultiCast: `//span[text()="Multicast"]`,
  "192.168.18.0 routing": "tr>td>span:contains('192.168.18.0')",
  "Destination IPMask": "input#dst",
  Gateway: "input#gateway",
  "Administrative Distance": "input#distance",
  "Device Interface": "div.selected-entry>span>span>span",
  Comments: "textarea#comment",

  Edit: "button span:contains('Edit'):eq(0)"
};

function openMulticast(self) {
  self.click(gateMap["Network"]);
  self.wait(500);
  self.click(gateMap["MultiCast"]);
  self.wait(1000);
}

/**
 * Editor: multicastInterfaceEditor
 * Key/Id
 *  k : intfCombo,
 *  k : pimModeCombo,
 *  i : drPriorityTextBox,
 *  i : rpCandidateCheckBox,
 *  i : rpCandidatePriorityTextBox
 * Editor: multicastEditor
 * Key/Id
 *  k : Enable Multicast Routing
 */

new Testcase({
  name: `multicast interface new`,
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Interfaces)", "click")`);
    this.wait(`//button[text()="Create New"]`);
    this.click(`//button[text()="Create New"]`);
    this.wait(`#fcld-interfaceEditor-name`);
    this.set(`#fcld-interfaceEditor-name`, `multi-intf`);
    this.set(`#fcld-interfaceEditor-vlanid`, 100);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("interfaceEditor-addrModeGroup", "DHCP")`
    );
    this.click(`#fcld-interfaceEditor-save`);
  }
});

new Testcase({
  name: "multicast_sparse_mode new",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Multicast)", "click")`);
    this.wait(1000);
    this.check(`input:checkbox`);
    this.click(`span:contains('Save')`);
    this.click(cloudMap["Create New"]);
    this.wait(2000);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("multicastInterfaceEditor-intfCombo", "multi-intf")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("multicastInterfaceEditor-pimModeCombo", "SPARSE_MODE")`
    );
    this.set(
      "#fcld-multicastInterfaceEditor-drPriorityTextBox",
      sparseModeKeyword
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("multicastInterfaceEditor-rpCandidateCheckBox", "true")`
    );
    this.set(
      "#fcld-multicastInterfaceEditor-rpCandidatePriorityTextBox",
      "200"
    );

    this.wait(2000);
    this.click(cloudMap["Save"]);
  },
  verify() {
    openMulticast(this);
    this.has(sparseModeKeyword);
    // this.isSet(gateMap['Destination IP'], "192.168.18.0")
    // this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
    // this.isSet(gateMap['Gateway'], "192.168.1.1")
    // this.isSet(gateMap['Administrative Distance'], 11)
    // this.isSet(gateMap['Device Interface'], "internal")
    // this.isSet(gateMap['Comments'], "test comments")
  }
});

new Testcase({
  name: "multicast sparse mode edit",
  testcase() {
    //sparse mode
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Multicast)", "click")`);
    this.wait(1000);
    this.click(`td.left:contains("multi-intf")~td.right div[title="Edit"]`);
    this.wait(2000);

    this.set("#fcld-multicastInterfaceEditor-drPriorityTextBox", 888);

    this.wait(2000);
    this.click(cloudMap["Save"]);
  },
  verify() {
    openMulticast(this);
    // this.isSet(gateMap['Destination IP'], "192.168.18.0")
    // this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
    // this.isSet(gateMap['Gateway'], "192.168.1.1")
    // this.isSet(gateMap['Administrative Distance'], 12)
    // this.isSet(gateMap['Device Interface'], "wan2")
    // this.isSet(gateMap['Comments'], "test comments")
  }
});

new Testcase({
  name: "multicast_sparse_mode delete",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Multicast)", "click")`);
    this.wait(1000);
    this.click(`td.left:contains("multi-intf")~td.right div[title="Delete"]`);
    this.click(cloudMap["YES"]);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("multicastEditor-Enable Multicast Routing", false)`
    );
    this.click(cloudMap["Save"]);
  },
  verify() {
    openMulticast(this);
    this.isDelete(sparseModeKeyword);
  }
});

new Testcase({
  name: "multicast_dense_mode new",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Multicast)", "click")`);
    this.wait(1000);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("multicastEditor-Enable Multicast Routing", true)`
    );
    this.click(`#fcld-multicastEditor-save`);
    this.click(cloudMap["Create New"]);
    this.wait(2000);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("multicastInterfaceEditor-pimModeCombo", "DENSE_MODE")`
    );
    this.evaluate(
      `FcldUiTest.setUiObjectValue("multicastInterfaceEditor-intfCombo", "${denseModeKeyword}")`
    );

    this.wait(2000);
    this.click(cloudMap["Save"]);
  },
  verify() {
    openMulticast(this);
    this.has(denseModeKeyword);
    // this.isSet(gateMap['Destination IP'], "192.168.18.0")
    // this.isSet(gateMap['Destination Netmask'], "255.255.255.0")
    // this.isSet(gateMap['Gateway'], "192.168.1.1")
    // this.isSet(gateMap['Administrative Distance'], 11)
    // this.isSet(gateMap['Device Interface'], "internal")
    // this.isSet(gateMap['Comments'], "test comments")
  }
});

new Testcase({
  name: "multicast_dense_mode delete",
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Multicast)", "click")`);
    this.wait(1000);
    this.click(cloudMap["Delete Dense Item"]);
    this.click(cloudMap["YES"]);
    this.wait(1000);
    this.evaluate(
      `FcldUiTest.setUiObjectValue("multicastEditor-Enable Multicast Routing", false)`
    );
    this.click(cloudMap["Save"]);
  },
  verify() {
    openMulticast(this);
    this.isDelete(denseModeKeyword);
  }
});

new Testcase({
  name: `multicast interface clean`,
  testcase() {
    this.evaluate(`FcldUiTest.setUiObjectValue("MENU:(Interfaces)", "click")`);
    this.wait(1000);
    this.click(`td.left:contains("multi-intf")~td.right div[title="Delete"]`);
    this.wait(`//td[text()="Are you sure you want to delete this item?"]`);
    this.click(`//span[text()="YES"]`);
  }
});
